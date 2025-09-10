import React from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Dimensions, ScrollView,
} from 'react-native';

const StartGameScreen = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../assets/img/4c21b770ee8a793ac0683e7f3970a3e396057496.png')} // подложка карты
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView>

            <View style={{marginTop: 100}}/>
            <View style={styles.card}>
                <Image
                    source={require('../assets/img/3846b4072fc805111bac61501460cddef231e77d.jpg')} // верхняя карта
                    style={styles.mapImage}
                    resizeMode="cover"
                />

                <Text style={styles.text}>
                    This quiz presents 8 real-life scenarios faced by Berliners during WWII. Your choices won’t be judged — but they will unlock true stories of those who lived through similar moments. There are no right answers. Only the weight of history.
                </Text>

                <Image
                    source={require('../assets/img/Group249.png')} // персонаж
                    style={styles.character}
                    resizeMode="contain"
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('QuizScreen')}
                >
                    <Text style={styles.buttonText}>GOT IT</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
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
        fontSize: 26,
        color: '#fff8dc',
        textAlign: 'left',
        lineHeight: 24,
        width: '80%',
        marginLeft: -50,
        marginBottom: 60,
        fontFamily: 'Cormorant',
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
    },
});

export default StartGameScreen;
