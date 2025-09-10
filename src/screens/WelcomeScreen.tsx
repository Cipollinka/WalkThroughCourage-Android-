import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const bg1 = require('../assets/img/4c21b770ee8a793ac0683e7f3970a3e396057496.png');
const bg2 = require('../assets/img/4c21b770ee8a793ac0683e7f3970a3e396057496.png');
const bg3 = require('../assets/img/4c21b770ee8a793ac0683e7f3970a3e396057496.png');

const WelcomeScreen = ({navigation}) => {
    const [screenIndex, setScreenIndex] = useState(0);

    const screensData = [
        {
            backgroundImage: bg1,
            icon: require('../assets/img/1b6add4d80d248861b87c445173093f367faef7c.png'),
            title: 'WALK THE CITY. DISCOVER THEIR COURAGE.',
            description:
                "Follow A Map Of Real Places Tied To Berlin's Hidden Resistance During WWII. Each Location Tells The Story Of Someone Who Chose To Stand Against Oppression — At Great Risk, Often In Silence. Mark Visited Spots And Unlock The History Under Your Feet.",
            buttonText: 'NEXT',
            onButtonPress: () => {
                if (screenIndex < screensData.length - 1) {
                    setScreenIndex(screenIndex + 1);
                } else {
                    console.log('Start Exploring!');
                }
            },
        },
        {
            backgroundImage: bg2,
            icon: require('../assets/img/be305982f02398644a8cd2f7e44f9ef2957923c5.png'),
            title: 'NOT JUST HISTORY. HUMAN STORIES.',
            description:
                "Read Powerful Accounts Of Berliners Who Resisted — Students, Workers, Neighbors. Each Profile Includes Archival Photos, Last Letters, Or Testimony From Those Who Knew Them. Their Bravery Wasn't Loud, But It Mattered.",
            buttonText: 'NEXT',
            onButtonPress: () => {
                if (screenIndex < screensData.length - 1) {
                    setScreenIndex(screenIndex + 1);
                } else {
                    console.log('Start Exploring!');
                }
            },
        },
        {
            backgroundImage: bg3,
            icon: require('../assets/img/ChatGPT33.png'),
            title: 'STEP INTO THEIR SHOES.',
            description:
                'Answer 8 Real-Life Scenarios Based On Wartime Berlin. Your Choices Unlock True Stories Of People Who Faced The Same Moral Dilemmas — Sometimes With Grave Consequences. No Right Answers. Just Truth.',
            buttonText: 'START EXPLORING',
            onButtonPress: () => {
                navigation.navigate('InitialScreen');
            },
        },
    ];

    const currentScreen = screensData[screenIndex];

    return (
        <ImageBackground source={currentScreen.backgroundImage} style={styles.background}>
            <View

                style={styles.gradientOverlay}
            >
                <View style={styles.card}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={currentScreen.icon}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={styles.title}>{currentScreen.title}</Text>
                    <Text style={styles.description}>{currentScreen.description}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={currentScreen.onButtonPress}>
                    <Text style={styles.buttonText}>{currentScreen.buttonText}</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        flex: 1,
        padding: 20,
        paddingTop: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#6b0000',
        borderColor: '#e6b17e',
        borderWidth: 2,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
        elevation: 12,
    },
    iconContainer: {
        marginBottom: 20,
    },
    icon: {
        width: 100,
        height: 100,
        tintColor: 'white',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Cormorant',
        textAlign: 'center',
        marginBottom: 15,
    },
    description: {
        fontFamily: 'Cormorant',
        fontSize: 25,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#c22727',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 10,
        marginBottom: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 26,
        fontFamily: 'Cormorant',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default WelcomeScreen;
