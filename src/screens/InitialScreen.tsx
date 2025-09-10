// import React from 'react';
// import {
//     View,
//     Text,
//     Image,
//     ImageBackground,
//     StyleSheet,
//     TouchableOpacity,
//     Dimensions,
// } from 'react-native';
//
// const InitialScreen = ({ navigation }) => {
//     return (
//         <ImageBackground
//             source={require('../assets/img/4c21b770ee8a793ac0683e7f3970a3e396057496.png')} // подложка карты
//             style={styles.background}
//             resizeMode="cover"
//         >
//             <View style={styles.card}>
//                 <Image
//                     source={require('../assets/img/3846b4072fc805111bac61501460cddef231e77d.jpg')} // верхняя карта
//                     style={styles.mapImage}
//                     resizeMode="cover"
//                 />
//
//                 <Text style={styles.text}>
//                     Walk Through Real Wartime Locations Where Quiet Acts Of Courage
//                     Unfolded. Tap On A Point To Read A True Story. Mark Places You’ve
//                     Visited — Your Journey Is Part Of The Memory.
//                 </Text>
//
//                 <Image
//                     source={require('../assets/img/Group249.png')} // персонаж
//                     style={styles.character}
//                     resizeMode="contain"
//                 />
//
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => navigation.navigate('MainTab')}
//                 >
//                     <Text style={styles.buttonText}>GOT IT</Text>
//                 </TouchableOpacity>
//             </View>
//         </ImageBackground>
//     );
// };
//
// const { width } = Dimensions.get('window');
//
// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         backgroundColor: '#1a1a1a',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     card: {
//         width: width * 0.9,
//         backgroundColor: '#4b0000',
//         borderRadius: 25,
//         borderWidth: 4,
//         borderColor: '#d2b48c',
//         padding: 20,
//         alignItems: 'center',
//         position: 'relative',
//     },
//     mapImage: {
//         width: '100%',
//         height: 180,
//         borderRadius: 10,
//         marginBottom: 20,
//     },
//     text: {
//         fontSize: 16,
//         color: '#fff8dc',
//         textAlign: 'left',
//         fontFamily: 'serif',
//         lineHeight: 24,
//         width: '80%',
//         marginLeft: -50,
//         marginBottom: 60,
//     },
//     character: {
//         position: 'absolute',
//         bottom: -20,
//         right: -20,
//         width: 220,
//         height: 300,
//     },
//     button: {
//         backgroundColor: '#a31414',
//         paddingVertical: 14,
//         paddingHorizontal: 60,
//         borderRadius: 30,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 6 },
//         shadowOpacity: 0.4,
//         shadowRadius: 6,
//         elevation: 8,
//         marginTop: 20,
//     },
//     buttonText: {
//         color: '#fff8dc',
//         fontSize: 18,
//         fontWeight: 'bold',
//         letterSpacing: 1,
//     },
// });
//
// export default InitialScreen;

import React from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {achievements} from "../achievementsData"; // Import AsyncStorage

// Define your achievements here (or import them if they are in a separate file)

const InitialScreen = ({ navigation }) => {

    // Function to grant achievements
    const grantAchievements = async () => {
        try {
            // Find the achievement objects by their IDs
            const voiceHeardAchievement = achievements.find(ach => ach.id === 'voice_heard');
            const firstStepAchievement = achievements.find(ach => ach.id === 'first_step');

            // Set achievements as completed in AsyncStorage
            if (voiceHeardAchievement) {
                await AsyncStorage.setItem(voiceHeardAchievement.storageKey, 'unlocked');
                console.log(`Achievement granted: ${voiceHeardAchievement.title}`);
            }
            if (firstStepAchievement) {
                await AsyncStorage.setItem(firstStepAchievement.storageKey, 'unlocked');
                console.log(`Achievement granted: ${firstStepAchievement.title}`);
            }

            // Navigate to MainTab after granting achievements
            navigation.navigate('MainTab');
        } catch (error) {
            console.error('Error granting achievements:', error);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/img/4c21b770ee8a793ac0683e7f3970a3e396057496.png')} // подложка карты
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.card}>
                <Image
                    source={require('../assets/img/3846b4072fc805111bac61501460cddef231e77d.jpg')} // верхняя карта
                    style={styles.mapImage}
                    resizeMode="cover"
                />

                <Text style={styles.text}>
                    Walk Through Real Wartime Locations Where Quiet Acts Of Courage
                    Unfolded. Tap On A Point To Read A True Story. Mark Places You’ve
                    Visited — Your Journey Is Part Of The Memory.
                </Text>

                <Image
                    source={require('../assets/img/Group249.png')} // персонаж
                    style={styles.character}
                    resizeMode="contain"
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={grantAchievements} // Call the new function here
                >
                    <Text style={styles.buttonText}>GOT IT</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: width * 0.9,
        backgroundColor: '#4b0000',
        borderRadius: 25,
        borderWidth: 4,
        borderColor: '#d2b48c',
        padding: 20,
        alignItems: 'center',
        position: 'relative',
    },
    mapImage: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: '#fff8dc',
        textAlign: 'left',
        fontFamily: 'Cormorant',

        lineHeight: 24,
        width: '80%',
        marginLeft: -50,
        marginBottom: 60,
    },
    character: {
        position: 'absolute',
        bottom: -20,
        right: -20,
        width: 220,
        height: 300,
    },
    button: {
        backgroundColor: '#a31414',
        paddingVertical: 14,
        paddingHorizontal: 60,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff8dc',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
        fontFamily: 'Cormorant',
    },
});

export default InitialScreen;
