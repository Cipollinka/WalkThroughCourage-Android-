import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const AchievementCard = ({ achievement, isUnlocked }) => {
    return (
        <View style={[styles.card, !isUnlocked && styles.lockedCard]}>
            {/* Main Icon */}
            <View style={styles.iconContainer}>
                <Image source={achievement.img}/>
            </View>

            {/* Character Face */}
            <Image
                source={require('../assets/img/b2def4fee2fa4f0c2dd1cad2571a10552bd17299.png')} // Small face image path
                style={[styles.smallFace, !isUnlocked && styles.lockedSmallFace]}
                resizeMode="contain"
            />

            <Text style={[styles.title, !isUnlocked && styles.lockedText]}>{achievement.title}</Text>
            <Text style={[styles.description, !isUnlocked && styles.lockedText]}>{achievement.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: (width * 0.9) / 2 - 15,
        paddingVertical: 50,
        aspectRatio: 1, // Make it square
        backgroundColor: '#4b0000',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#d2b48c',
        padding: 10,
        // height: 300,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: 30,
        elevation: 6,
    },
    lockedCard: {
        backgroundColor: '#333333', // Darker background for locked state
        borderColor: '#666666', // Muted border for locked state
        opacity: 0.7, // Slightly faded
    },
    iconContainer: {
        marginBottom: 8,
        marginTop: 20,
    },
    smallFace: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 30, // Adjust size as needed
        height: 30,
        borderRadius: 15, // Make it circular
        borderWidth: 1,
        borderColor: '#d2b48c',
    },
    lockedSmallFace: {
        opacity: 0.3, // Fade out face if locked
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff8dc',
        textAlign: 'center',
        fontFamily: 'serif',
        marginTop: 5,
        lineHeight: 16,
    },
    description: {
        fontSize: 14,
        color: '#fff8dc',
        textAlign: 'center',
        fontFamily: 'serif',
        marginTop: 5,
        marginBottom: 50,
        lineHeight: 14,
    },
    lockedText: {
        color: '#aaaaaa', // Muted text color for locked state
    },
});

export default AchievementCard;
