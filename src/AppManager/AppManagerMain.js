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

import LoadingAppManager from './LoadingAppManager';
import SendIntentAndroid from 'react-native-send-intent';

export default function AppManagerMain({navigation, route}) {
    const linkRefresh = route.params.data;
    const userAgent = route.params.userAgent;
    // console.log(userAgent);
    // const userAgent = 'Mozilla/5.0 (Linux; Android 14; SM-G990B2 Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/132.0.6834.163 Mobile Safari/537.36';
    // const SendIntentAndroid = require('react-native-send-intent');


    const webViewRef = useRef(null);

    const redirectDomens = [
        'https://spin.city/payment/success?identifier=',
        'https://jokabet.com/',
        'https://winspirit.app/?identifier=',
        'https://rocketplay.com/api/payments',
        'https://ninewin.com/',
    ];

    const domensForBlock = [
        'bitcoin',
        'litecoin',
        'dogecoin',
        'tether',
        'ethereum',
        'bitcoincash',
    ];

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

    const openURLInBrowser = async url => {
        await Linking.openURL(url);
    };

    const checkLinkInArray = (link, array) => {
        for (let i = 0; i < array.length; i++) {
            if (link.includes(array[i])) {
                return true;
            }
        }
        return false;
    };

    const [currentURL, setCurrentURL] = useState('');
    const checkURL = useRef('');

    function checkLockedURL(url) {
        setCurrentURL(url);
        setTimeout(() => {
            if (currentURL === 'about:blank') {
                webViewRef.current.injectJavaScript(
                    `window.location.replace('${linkRefresh}')`,
                );
            }
        }, 2000);
    }


    const onShouldStartLoadWithRequest = event => {
        let currentUrl = event.url;
        console.log('MAIN_SHOULD_START_LOAD_WITH_REQUEST', currentUrl);

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

        try {
            if (
                event.url.includes('interac.express-connect.com') ||
                event.url.includes('https://linx24.com/') ||
                event.url.includes(
                    'https://bankieren.rabobank.nl/consent/jump-to/start?',
                ) ||
                event.url.includes('api.payment-gateway.io/app/de/paymentPage')
                || event.url.includes('https://www.payzoff.com/payment') ||
                event.url.includes('https://bpglobalfav.live/pay/') ||
                event.url.includes('https://api.paymentapi111.com/payoption/')
            ) {
                navigation.navigate('child', {
                    data: event.url,
                    userAgent: route.params.userAgent,
                });
                webViewRef.current.injectJavaScript(
                    `window.location.replace('${linkRefresh}')`,
                );
            }
        } catch (_) {
        }
        try {
            if (
                !(
                    event.mainDocumentURL.includes('pay.skrill.com') ||
                    event.mainDocumentURL.includes('app.corzapay.com')
                )
            ) {
            } else {
                navigation.navigate('child', {data: event.mainDocumentURL});
                webViewRef.current.injectJavaScript(
                    `window.location.replace('${linkRefresh}')`,
                );
            }
        } catch (error) {
        }

        if (checkLinkInArray(currentUrl, openInBrowser)) {
            webViewRef.current.stopLoading();
            openURLInBrowser(currentUrl);
            webViewRef.current.injectJavaScript(
                `window.location.replace('${linkRefresh}')`,
            );
        }

        if (checkLinkInArray(currentUrl, redirectDomens)) {
            webViewRef.current.injectJavaScript(
                `window.location.replace('${linkRefresh}')`,
            );
        }

        if (checkLinkInArray(currentUrl, domensForBlock)) {
            webViewRef.current.stopLoading();
            return false;
        }
        return true;
    };

    const stateChange = navState => {
        const currentUrl = navState.url;
        console.log('MAIN_NAVIGATION_STATION_CHANGE', currentUrl);
        checkURL.current = currentUrl;
        checkLockedURL(currentUrl);
    };

    const [isDoubleClick, setDoubleClick] = useState(false);

    const isBackClick = () => {
        if (isDoubleClick) {
            webViewRef.current.injectJavaScript(
                `window.location.replace('${linkRefresh}')`,
            );
        } else {
            webViewRef.current.goBack();
            setDoubleClick(true);
        }
        setTimeout(() => {
            setDoubleClick(false);
        }, 400);
    };

    const [isInit, setInit] = React.useState(true);
    const [isLoadingPage, setLoadingPage] = useState(true);
    const [isInvisibleLoader, setInvisibleLoader] = useState(false);

    const finishLoading = () => {
        if (!isInit) {
            setInit(true);
        } else {
            setLoadingPage(false);
            setInvisibleLoader(true);
        }
    };

    useEffect(() => {
        const backActionClick = () => {
            isBackClick();
            return true; // повертаємо true, щоб ПРИГЛУШИТИ стандартну поведінку
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backActionClick,
        );

        return () => backHandler.remove();
    }, []);

    return (
        <>
            <View style={{flex: 1}}>
                <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
                    <StatusBar barStyle={'light-content'}/>
                    <WebView
                        originWhitelist={[
                            '*',
                            'http://*',
                            'https://*',
                            'intent://*',
                            'tel:*',
                            'mailto:*',
                            'itms-appss://*',
                            'https://m.facebook.com/*',
                            'https://www.facebook.com/*',
                            'https://www.instagram.com/*',
                            'https://twitter.com/*',
                            'https://x.com/*',
                            'https://www.whatsapp.com/*',
                            'https://t.me/*',
                            'fb://*',
                        ]}
                        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                        onNavigationStateChange={stateChange}
                        source={{uri: linkRefresh}}
                        textZoom={100}
                        allowsBackForwardNavigationGestures={true}
                        domStorageEnabled={true}
                        javaScriptEnabled={true}
                        onLoadStart={() => setLoadingPage(true)}
                        onLoadEnd={() => finishLoading()}
                        allowsInlineMediaPlayback={true}
                        mediaPlaybackRequiresUserAction={false}
                        onLoad={event => {
                            console.log('Load event', event);
                        }}
                        onError={syntEvent => {
                            const {nativeEvent} = syntEvent;
                            const {code} = nativeEvent;
                            if (code === -1002) {
                                Alert.alert(
                                    'Ooops',
                                    "It seems you don't have the bank app installed, wait for a redirect to the payment page",
                                );
                            }
                        }}
                        onOpenWindow={syntheticEvent => {
                            const {nativeEvent} = syntheticEvent;
                            const {targetUrl} = nativeEvent;
                            console.log('MAIN_OPEN_WINDOW', targetUrl);
                            if (checkLinkInArray(targetUrl, openInBrowser)) {
                                openURLInBrowser(targetUrl);
                                return;
                            }
                            // if (
                            //   targetUrl.includes(
                            //     'https://app.payment-gateway.io/static/loader.html',
                            //   )
                            // ) {
                            //   return;
                            // }
                            try {
                                if (Linking.canOpenURL(targetUrl)) {
                                    navigation.navigate('child', {data: targetUrl});
                                }
                            } catch (error) {
                            }
                        }}
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
            {isLoadingPage && !isInvisibleLoader ? <LoadingAppManager/> : <></>}
        </>
    );
}