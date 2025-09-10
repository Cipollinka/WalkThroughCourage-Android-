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


const { width, height } = Dimensions.get('window');

const ResultsScreen = ({ navigation }) => {

    // Function to grant achievements
    const grantAchievementsAndNavigate = async () => {
        try {
            // Find the achievement objects by their IDs
            const walkedInTheirShoesAchievement = achievements.find(ach => ach.id === 'walked_in_their_shoes');
            const echoOfTheBraveAchievement = achievements.find(ach => ach.id === 'echo_of_the_brave');

            // Set achievements as completed in AsyncStorage
            if (walkedInTheirShoesAchievement) {
                await AsyncStorage.setItem(walkedInTheirShoesAchievement.storageKey, 'unlocked');
                console.log(`Achievement granted: ${walkedInTheirShoesAchievement.title}`);
            }
            if (echoOfTheBraveAchievement) {
                await AsyncStorage.setItem(echoOfTheBraveAchievement.storageKey, 'unlocked');
                console.log(`Achievement granted: ${echoOfTheBraveAchievement.title}`);
            }

            // Navigate back after granting achievements
            navigation.pop(2);
        } catch (error) {
            console.error('Error granting achievements:', error);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/img/4c21b770ee8a793ac0683e7f3970a3e396057496.png')} // Reusing the same background image
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.card}>
                {/* Character Image */}
                <Image
                    source={require('../assets/img/Group249.png')} // Reusing the same character image
                    style={styles.character}
                    resizeMode="contain"
                />

                {/* Content Card */}
                <View style={styles.contentCard}>
                    <Text style={styles.title}>Not Everyone Stood Up.</Text>
                    <Text style={styles.description}>
                        Some Watched In Silence. Others Looked Away.
                        In A City Drowning In Fear,
                        Courage Was Rare — But Not Impossible.
                        Now You’ve Seen What They Faced.
                        Would You Choose Differently Next Time?
                    </Text>

                    <TouchableOpacity
                        style={styles.tryAgainButton}
                        onPress={grantAchievementsAndNavigate} // Call the new function here
                    >
                        <Text style={styles.buttonText}>TRY AGAIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

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
        minHeight: height * 0.7, // Ensure card takes up a good portion of the screen
        justifyContent: 'center', // Center content vertically
    },
    character: {
        position: 'absolute',
        top: -100,
        right: 0,
        width: width * 0.4,
        height: height * 0.3,
        zIndex: 1,
    },
    contentCard: {
        width: '100%',
        backgroundColor: '#4b0000',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#d2b48c',
        padding: 20,
        alignItems: 'center',
        marginTop: 60, // Adjust to make space for the character
    },
    title: {
        fontSize: 26,
        color: '#fff8dc',
        fontFamily: 'serif',
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    description: {
        fontSize: 16,
        color: '#fff8dc',
        textAlign: 'left',
        fontFamily: 'serif',
        lineHeight: 24,
        width: '90%',
        marginBottom: 40,
        paddingHorizontal: 10,
    },
    tryAgainButton: {
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
    },
});

export default ResultsScreen;
