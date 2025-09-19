import React, {useEffect, useRef, useState} from 'react';
import {
  Linking,
  SafeAreaView,
  StatusBar,
  View,
  Alert,
  BackHandler,
} from 'react-native';
import WebView from 'react-native-webview';

export default function AppManagerChild({navigation, route}) {
  const linkRefresh = route.params.data;
  const userAgent = route.params.userAgent;
  const webViewRef = useRef(null);
  const SendIntentAndroid = require('react-native-send-intent');

  const redirectDomens = ['https://ninecasino.life/#deposit'];

  const openInBrowser = [
    'mailto:',
    'itms-appss://',
    'https://m.facebook.com/',
    'https://www.facebook.com/',
    'https://www.instagram.com/',
    'https://twitter.com/',
    'https://www.whatsapp.com/',
    'https://t.me/',
    'fb://',
    'conexus://',
    'bmoolbb://',
    'cibcbanking://',
    'bncmobile://',
    'rbcmobile://',
    'scotiabank://',
    'pcfbanking://',
    'rbcbanking',
    'tdct://',
    'nl.abnamro.deeplink.psd2.consent://',
    'nl-snsbank-sign://',
    'nl-asnbank-sign://',
    'triodosmobilebanking',
    'intent://',
    'paytmmp://',
    'paytmp://',
    'upi://',
    'phonepe://',
    'tez://',
    'monzo://',
    'nl-asnbank-ideal://',
    'bunq://',
    'market://',
    'https://rmpy.adj.st/wallet/'
  ];


  const [backPressCount, setBackPressCount] = useState(0);

  useEffect(() => {
    const backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (backPressCount === 1) {
          navigation.goBack();
          return true;
        } else {
          setBackPressCount(1);
          webViewRef.current.goBack();

          setTimeout(() => {
            setBackPressCount(0);
          }, 400);

          return true;
        }
      },
    );

    return () => backHandlerListener.remove();
  }, [backPressCount]);

  const checkLinkInArray = (link, array) => {
    try {
      for (let i = 0; i < array.length; i++) {
        if (link.includes(array[i])) {
          return true;
        }
      }
      return false;
    } catch (_) {
      return false;
    }
  };

  const openURLInBrowser = async url => {
    await Linking.openURL(url);
  };

  const onShouldStartLoadWithRequest = event => {
    console.log('CHILD_SHOULD_START_LOAD_WITH_REQUEST', event.url);

    if (event.url.includes('play.google.com/store/apps/details')) {
      openURLInBrowser(event.url);
      return false;
    }

    if (checkLinkInArray(event.url, openInBrowser)) {
      try {
        console.log('openAppr', event.url);
        let linkToOpen = event.url;
        // if (linkToOpen.includes('intent://rbcbanking')) {
        //   linkToOpen = event.url.split('#Intent;')[0].replace('intent://rbcbanking?', 'rbcbanking://?')
        //   console.log('rbc_new_link', linkToOpen)
        // }
        SendIntentAndroid.openChromeIntent(linkToOpen).then(res => {
          console.log('sending chrome intent', res);
          if (!res)
            Alert.alert(
              'Ooops',
              "It seems you don't have the bank app installed, wait for a redirect to the payment page",
            );
        });
      } catch (error) {
        console.log(error);
        Alert.alert(
          'Ooops',
          "It seems you don't have the bank app installed, wait for a redirect to the payment page",
        );
      }
      return false;
    }

    if (checkLinkInArray(event.mainDocumentURL, redirectDomens)) {
      navigation.navigate('main');
      return false;
    }
    return true;
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
        <StatusBar barStyle={'light-content'} />
        <WebView
          originWhitelist={['*', 'http://*', 'https://*']}
          source={{uri: linkRefresh}}
          textZoom={100}
          onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
          allowsBackForwardNavigationGestures={true}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          onError={syntEvent => {
            const {nativeEvent} = syntEvent;
            const {code} = nativeEvent;
            if (code === -1101) {
              navigation.goBack();
            }
            if (code === -10) {
              Alert.alert(
                'Ooops',
                "It seems you don't have the bank app installed, wait for a redirect to the payment page",
              );
              navigation.goBack();
            }
          }}
          onOpenWindow={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            const {targetUrl} = nativeEvent;
            console.log('CHILD_OPEN_WINDOW', targetUrl);
          }}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          setSupportMultipleWindows={false}
          allowFileAccess={true}
          showsVerticalScrollIndicator={false}
          javaScriptCanOpenWindowsAutomatically={true}
          style={{flex: 1}}
          ref={webViewRef}
          userAgent={userAgent}
        />
      </SafeAreaView>
    </View>
  );
}