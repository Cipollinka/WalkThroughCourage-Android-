import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity, // For testing unlock
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {achievements} from "../achievementsData";
import AchievementCard from "../component/AchievementCard.tsx"; // If using React Navigation


const { width } = Dimensions.get('window');

const AchievementsScreen = () => {
    const [unlockedAchievements, setUnlockedAchievements] = useState({});

    const loadAchievements = async () => {
        try {
            const achievementsStatus = {};
            for (const achievement of achievements) {
                const status = await AsyncStorage.getItem(achievement.storageKey);
                achievementsStatus[achievement.id] = status === 'unlocked';
            }
            setUnlockedAchievements(achievementsStatus);
        } catch (error) {
            console.error("Error loading achievements:", error);
        }
    };

    // Use useFocusEffect if this screen is part of a React Navigation stack
    // This ensures data is refreshed when the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadAchievements();
        }, [])
    );

    // If not using React Navigation, use useEffect:
    /*
    useEffect(() => {
        loadAchievements();
    }, []);
    */

    // --- FOR DEMONSTRATION/TESTING ONLY ---
    // Function to simulate unlocking an achievement
    const unlockRandomAchievement = async () => {
        const locked = achievements.filter(
            (ach) => !unlockedAchievements[ach.id]
        );
        if (locked.length > 0) {
            const randomAch = locked[Math.floor(Math.random() * locked.length)];
            try {
                await AsyncStorage.setItem(randomAch.storageKey, 'unlocked');
                loadAchievements(); // Reload to update UI
                console.log(`Unlocked: ${randomAch.title}`);
            } catch (error) {
                console.error("Error unlocking achievement:", error);
            }
        } else {
            console.log("All achievements unlocked!");
        }
    };

    // Function to reset all achievements (for testing)
    const resetAchievements = async () => {
        try {
            for (const achievement of achievements) {
                await AsyncStorage.removeItem(achievement.storageKey);
            }
            loadAchievements(); // Reload to update UI
            console.log("All achievements reset!");
        } catch (error) {
            console.error("Error resetting achievements:", error);
        }
    };
    // --- END DEMONSTRATION FUNCTIONS ---


    return (
        <ImageBackground
            source={require('../assets/img/4c21b770ee8a793ac0683e7f3970a3e396057496.png')} // Use your background image
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView styles={styles.scrollViewContent}>
                <View style={{marginTop: 50}}/>
                <Text style={styles.headerTitle}>Achievements</Text>
                <View style={styles.achievementsGrid}>
                    {achievements.map((achievement) => (
                        <AchievementCard
                            key={achievement.id}
                            achievement={achievement}
                            isUnlocked={unlockedAchievements[achievement.id]}
                        />
                    ))}
                </View>

                {/*/!* --- FOR DEMONSTRATION/TESTING ONLY --- *!/*/}
                {/*<View style={styles.testButtonsContainer}>*/}

                {/*    <TouchableOpacity style={styles.testButton} onPress={resetAchievements}>*/}
                {/*        <Text style={styles.testButtonText}>Reset All</Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
                {/* --- END DEMONSTRATION FUNCTIONS --- */}
            <View style={{marginBottom: 450}}/>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    scrollViewContent: {
        padding: 15,
        alignItems: 'center',
        paddingTop: 50, // Give some space from the top
    },
    headerTitle: {
        fontSize: 30,
        marginLeft: 16,
        fontWeight: 'bold',
        color: '#fff8dc',
        marginBottom: 20,
        fontFamily: 'serif',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    achievementsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,

    },
    // --- FOR DEMONSTRATION/TESTING ONLY ---
    testButtonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 20,
    },
    testButton: {
        backgroundColor: '#6b0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    testButtonText: {
        color: '#fff8dc',
        fontSize: 14,
    },
    // --- END DEMONSTRATION FUNCTIONS ---
});

export default AchievementsScreen;
