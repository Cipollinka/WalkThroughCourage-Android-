import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from 'react-native';
import ResultsScreen from './ResultsScreen';
import {quizQuestions} from "../quizData"; // Import the new ResultsScreen

const { width, height } = Dimensions.get('window');

const QuizScreen = ({navigation}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showOutcome, setShowOutcome] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false); // New state for quiz completion

    const question = quizQuestions[currentQuestionIndex];

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setShowOutcome(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setShowOutcome(false);
        } else {
            // End of quiz
            setQuizCompleted(true); // Set quiz as completed
        }
    };

    const handleTryAgain = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setShowOutcome(false);
        setQuizCompleted(false); // Reset quiz completion state
    };

    if (quizCompleted) {
        return navigation.navigate('ResultsScreen')
    }

    return (
        <ImageBackground
            source={require('../assets/img/4c21b770ee8a793ac0683e7f3970a3e396057496.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    {/* Character Image */}
                    <Image
                        source={require('../assets/img/Group249.png')}
                        style={styles.character}
                        resizeMode="contain"
                    />

                    {/* Question Card */}
                    <View style={styles.questionCard}>
                        <Text style={styles.quizTitle}>🧠 Quiz: What Would You Do?</Text>
                        <Text style={styles.questionText}>{question.question}</Text>

                        {question.options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.optionButton,
                                    selectedOption === option && option.isCorrect && styles.correctOption,
                                    selectedOption === option && !option.isCorrect && styles.incorrectOption,
                                ]}
                                onPress={() => handleOptionSelect(option)}
                                disabled={showOutcome}
                            >
                                <Text style={styles.optionText}>{String.fromCharCode(65 + index)}) {option.text}</Text>
                                {selectedOption === option && option.isCorrect && (
                                    <Text style={styles.checkMark}>✅</Text>
                                )}
                            </TouchableOpacity>
                        ))}

                        {showOutcome && (
                            <View style={styles.outcomeContainer}>
                                <Text style={styles.outcomeText}>
                                    <Text style={styles.checkMark}>✅</Text> Real outcome: {question.realOutcome}
                                </Text>
                                <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
                                    <Text style={styles.buttonText}>
                                        {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
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
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
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
        minHeight: height * 0.7,
        justifyContent: 'space-between',
    },
    character: {
        position: 'absolute',
        top: -100,
        right: 0,
        width: width * 0.4,
        height: height * 0.3,
        zIndex: 1,
    },
    questionCard: {
        width: '100%',
        backgroundColor: '#4b0000',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#d2b48c',
        padding: 20,
        alignItems: 'center',
        marginTop: 100,
    },
    quizTitle: {
        fontSize: 22,
        color: '#fff8dc',
        fontFamily: 'serif',
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    questionText: {
        fontSize: 18,
        color: '#fff8dc',
        textAlign: 'left',
        fontFamily: 'serif',
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
    },
    optionButton: {
        backgroundColor: '#a31414',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
        marginTop: 15,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionText: {
        color: '#fff8dc',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        flexShrink: 1,
    },
    correctOption: {
        backgroundColor: '#28a745',
        borderColor: '#fff8dc',
        borderWidth: 2,
    },
    incorrectOption: {
        backgroundColor: '#dc3545',
        borderColor: '#fff8dc',
        borderWidth: 2,
    },
    outcomeContainer: {
        marginTop: 30,
        backgroundColor: '#3a0000',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#d2b48c',
        padding: 15,
        width: '100%',
    },
    outcomeText: {
        fontSize: 15,
        color: '#fff8dc',
        textAlign: 'left',
        fontFamily: 'serif',
        lineHeight: 22,
    },
    checkMark: {
        fontSize: 18,
        marginLeft: 10,
    },
    nextButton: {
        backgroundColor: '#a31414',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
        marginTop: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff8dc',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});

export default QuizScreen;
