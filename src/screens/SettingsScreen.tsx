import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Dimensions, Image,
} from 'react-native';

const { width } = Dimensions.get('window');

const SettingsScreen = () => {
    // You would typically manage settings state (e.g., sound on/off) here
    // and implement functions to handle button presses.

    const handleSoundPress = () => {
        console.log('Sound button pressed!');
        // Implement sound toggle logic here (e.g., toggle global sound state)
    };

    const handleLanguagePress = () => {
        console.log('Language/Text size button pressed!');
        // Implement language or text size settings logic
    };

    const handleClearDataPress = () => {
        console.log('Clear data button pressed!');
        // Implement clear game data/cache logic here
        // Be very careful with this in a real app, usually requires confirmation!
    };

    const handleSharePress = () => {
        console.log('Share button pressed!');
        // Implement share functionality (e.g., share app link)
    };

    return (
        <ImageBackground
            source={require('../assets/img/background.png')} // Reusing your background image
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={styles.buttonsGrid}>
                    <TouchableOpacity style={styles.button} onPress={handleSoundPress}>
                        <Image source={require('../assets/img/SilentCBerlin')} />
                        {/* You might add text labels below icons if needed, e.g., <Text style={styles.buttonText}>Sound</Text> */}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleLanguagePress}>
                        {/* This icon could represent language or text size (e.g., file-alt for text, or expand/compress icons) */}
                        {/*<Icon name="text-width" size={width * 0.12} color="#fff8dc" />*/}
                        {/* A common icon for language settings is a globe or text-size related icon. I chose text-width as a guess. */}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleClearDataPress}>
                        {/*<Icon name="broom" size={width * 0.12} color="#fff8dc" />*/}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleSharePress}>
                        {/*<Icon name="share-square" size={width * 0.12} color="#fff8dc" />*/}
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
    container: {
        width: width * 0.9, // Match card width from other screens
        backgroundColor: '#4b0000', // Match card background
        borderRadius: 25,
        borderWidth: 4,
        borderColor: '#d2b48c', // Match card border
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around', // Distribute buttons evenly
        width: '100%',
    },
    button: {
        width: '45%', // Approximately two buttons per row with spacing
        aspectRatio: 1, // Make buttons square
        backgroundColor: '#a31414', // Button background color
        borderRadius: 15, // Slightly rounded corners
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2%', // Spacing between buttons
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 7,
    },
    // If you decide to add text labels below icons:
    /*
    buttonText: {
        color: '#fff8dc',
        fontSize: 14,
        marginTop: 5,
        fontFamily: 'serif',
    },
    */
});

export default SettingsScreen;
