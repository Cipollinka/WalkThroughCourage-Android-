import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {achievements} from "../achievementsData"; // Import AsyncStorage

const { width, height } = Dimensions.get('window');



export default function StoryDetailScreen({ route }) {
    const { story } = route.params;
    const [showMap, setShowMap] = useState(false);

    // Function to parse coordinates string into latitude and longitude
    const parseCoordinates = (coordString) => {
        const cleanedCoords = coordString.replace('Approx. ', '').split(',').map(s => s.trim());
        const latitude = parseFloat(cleanedCoords[0]);
        const longitude = parseFloat(cleanedCoords[1]);

        if (isNaN(latitude) || isNaN(longitude)) {
            console.warn(`Invalid coordinates for story ${story.id}: ${coordString}`);
            return null;
        }
        return { latitude, longitude };
    };

    const coordinates = parseCoordinates(story.coords);

    // Function to grant achievements when map button is pressed
    const handleMapToggle = async () => {
        try {
            // Find the achievement objects by their IDs
            const archivistOfCourageAchievement = achievements.find(ach => ach.id === 'archivist_of_courage');
            const witnessToThePastAchievement = achievements.find(ach => ach.id === 'witness_to_the_past');

            // Set achievements as completed in AsyncStorage
            if (archivistOfCourageAchievement) {
                await AsyncStorage.setItem(archivistOfCourageAchievement.storageKey, 'unlocked');
                console.log(`Achievement granted: ${archivistOfCourageAchievement.title}`);
            }
            if (witnessToThePastAchievement) {
                await AsyncStorage.setItem(witnessToThePastAchievement.storageKey, 'unlocked');
                console.log(`Achievement granted: ${witnessToThePastAchievement.title}`);
            }

            // Toggle map visibility after granting achievements
            setShowMap(!showMap);
        } catch (error) {
            console.error('Error granting achievements:', error);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/img/4c21b770ee8a793ac0683e7f3970a3e396057496.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    {/* Header */}
                    <View style={styles.headerRow}>
                        <Image source={story.image} style={styles.storyImage} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{story.title}</Text>
                            <View style={styles.coordRow}>
                                <Image
                                    source={require('../assets/img/b2def4fee2fa4f0c2dd1cad2571a10552bd17299.png')}
                                    style={styles.markerIcon}
                                />
                                <Text style={styles.coords}>{story.coords}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Description */}
                    <Text style={styles.description}>
                        {story.fullText}
                    </Text>

                    {/* Map Placeholder Image (Optional - can remove if always showing interactive map) */}
                    {!showMap && (
                        <Image
                            source={require('../assets/img/ChatGPT33.png')}
                            style={styles.mapPlaceholderImage}
                        />
                    )}

                    {/* Footer Buttons */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.showMapButton}
                            onPress={handleMapToggle} // Call the new function here
                        >
                            <Text style={styles.showMapButtonText}>
                                {showMap ? 'HIDE MAP' : 'SHOW MAP'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Interactive Map */}
                    {showMap && coordinates && (
                        <View style={styles.interactiveMapContainer}>
                            <MapView
                                style={styles.interactiveMap}
                                initialRegion={{
                                    latitude: coordinates.latitude,
                                    longitude: coordinates.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                                showsUserLocation={true}
                                showsCompass={true}
                                toolbarEnabled={true}
                                zoomEnabled={true}
                                scrollEnabled={true}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: coordinates.latitude,
                                        longitude: coordinates.longitude,
                                    }}
                                    title={story.title}
                                    description={story.coords}
                                />
                            </MapView>
                        </View>
                    )}
                </View>
                <View style={{ marginBottom: 100 }} />
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 16,
        paddingTop: 100,
    },
    card: {
        backgroundColor: '#5c0000',
        borderRadius: 22,
        padding: 16,
        borderWidth: 3,
        borderColor: '#dec7a3',
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    storyImage: {
        width: 120,
        height: 100,
        borderRadius: 16,
        marginRight: 12,
        resizeMode: 'cover',
    },
    title: {
        color: '#f9e7cf',
        fontSize: 22,
        fontWeight: '900',
        marginBottom: 6,
        fontFamily: 'Cormorant',
        flexShrink: 1,
    },
    coordRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    markerIcon: {
        width: 16,
        height: 20,
        marginRight: 6,
        resizeMode: 'contain',
    },
    coords: {
        color: '#e0c3a0',
        fontSize: 14,
    },
    description: {
        color: '#e7c8b0',
        fontSize: 24,
        lineHeight: 22,
        marginBottom: 16,
        fontFamily: 'Cormorant',
    },
    mapPlaceholderImage: {
        width: '100%',
        height: 140,
        resizeMode: 'cover',
        borderRadius: 20,
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    showMapButton: {
        backgroundColor: '#a01d2a',
        paddingHorizontal: 32,
        paddingVertical: 10,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    showMapButtonText: {
        color: '#f5e9d8',
        fontSize: 18,
        fontWeight: '600',
    },
    interactiveMapContainer: {
        height: height * 0.4,
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#dec7a3',
    },
    interactiveMap: {
        ...StyleSheet.absoluteFillObject,
    },
});
