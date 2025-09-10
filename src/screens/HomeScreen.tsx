import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const LOCATIONS = [
    {
        id: '1', // Use string ID for consistency if it's coming from external data later
        title: 'Amsterdamer Straße 10 – Otto & Elise Hampel',
        coordinates: { latitude: 52.55111, longitude: 13.35694 },
        image: require('../assets/img/Silenterlin-5/1fqwf01.png'), // Ensure this path is correct
        description: "Otto and Elise Hampel, a working-class couple from Berlin's Wedding district, began leaving handwritten postcards with anti-Nazi messages in stairwells around the city between 1940 and 1942. These small acts of defiance urged citizens to resist Hitler, boycott the war effort, and reject fascist ideology.\nTheir quiet protest continued for almost two two years until they were betrayed and arrested by the Gestapo.\nIn April 1943, both were executed at Plötzensee Prison for \"undermining military morale.\" Their story was later fictionalized in Hans Fallada’s novel Every Man Dies Alone.\nA plaque now marks their former home, honoring their humble yet powerful resistance."
    },
    {
        id: '2',
        title: 'Plötzensee Prison – Wall of Memory',
        coordinates: { latitude: 52.54100, longitude: 13.32200 },
        image: require('../assets/img/Silenterlin-5/2191779_ori1.png'),
        description: "Plötzensee Prison became one of Nazi Germany's main execution sites for political prisoners. Between 1933 and 1945, more than 2,800 people were executed here, including many from the German Resistance.\nThese included members of the Red Orchestra, the White Rose, and the July 20 Plot. Executions were carried out by hanging or beheading, often in groups.\nToday, the prison is a solemn memorial. The original execution shed has been preserved, with a wall of names and a permanent exhibition dedicated to victims.\nThis site stands as a powerful reminder of how resistance, even when punished, leaves a legacy."
    },
    {
        id: '3',
        title: 'Bendlerblock – July 20 Plot',
        coordinates: { latitude: 52.50778, longitude: 13.36250 },
        image: require('../assets/img/Silenterlin-5/7183227805_144ff572d2_b.png'),
        description: "Bendlerblock was the headquarters of the July 20, 1944 assassination attempt on Hitler, also known as Operation Valkyrie. Colonel Claus von Stauffenberg planted a bomb at Hitler's Eastern Front HQ and returned to Berlin to initiate a coup.\nAfter the plan failed, Stauffenberg and his co-conspirators were arrested and executed in the courtyard that same night.\nToday, Bendlerblock houses the German Resistance Memorial Center, which documents the diverse forms of opposition to the Nazi regime.\nIt honors not only the plotters but the moral courage behind their actions."
    },
    {
        id: '4',
        title: 'Kastanienallee 23 – Elisabeth & Erich Gloeden',
        coordinates: { latitude: 52.51028, longitude: 13.26861 },
        image: require('../assets/img/Silenterlin-5/ChatGP1.png'),
        description: "Elisabeth Charlotte \"Lilo\" Gloeden and her husband Erich sheltered General Fritz Lindemann, a key figure in the July 20 plot, in their apartment in Westend.\nWhen the Gestapo raided the flat in September 1944, the Gloedens and Lilo's mother were arrested. All three were sentenced to death and executed at Plötzensee.\nTheir Stolpersteine (\"stumbling stones\") still mark their former residence.\nTheir courage to harbor a fugitive was a testament to the civilian resistance within Nazi Germany."
    },
    {
        id: '5',
        title: 'Westend – Harro & Libertas Schulze-Boysen',
        // Note: For "Approx. 52.5130, 13.2840", assuming these are the precise coordinates for the map.
        coordinates: { latitude: 52.5130, longitude: 13.2840 },
        image: require('../assets/img/Silenterlin-5/Berlijpanorami1.png'),
        description: "Harro and Libertas Schulze-Boysen were central figures in the Red Orchestra, an anti-Nazi resistance and intelligence network.\nLibertas worked at the Ministry of Propaganda and secretly collected evidence of Nazi crimes. Harro, an officer in the Luftwaffe, used his position to pass information to the Allies.\nThey were arrested in 1942, interrogated, and executed at Plötzensee.\nTheir apartment in Westend was both a home and a resistance cell, driven by intellect, love, and defiance."
    },
    {
        id: '6',
        title: 'Humboldt University – White Rose Leaflets',
        coordinates: { latitude: 52.51806, longitude: 13.39333 },
        image: require('../assets/img/Silenterlin-5/Berlin_Potsdamer_Platz_early_1900s_Grand_Hotel_Bellevue.png'),
        description: "Though based in Munich, the White Rose resistance group distributed their leaflets across Germany, including Berlin’s Humboldt University.\nThese leaflets, written by Hans and Sophie Scholl and others, called for civil disobedience and condemned the Nazi regime's atrocities.\nStudents in Berlin photocopied and passed them around lecture halls and staircases. Possessing them was punishable by death.\nTheir distribution at Humboldt showed how ideas could travel and spark moral reckoning across cities."
    },
    {
        id: '7',
        title: 'Potsdamer Platz – German Resistance Memorial Center',
        coordinates: { latitude: 52.50966, longitude: 13.37648 },
        image: require('../assets/img/Silenterlin-5/rftyguhi.png'),
        description: "Near Potsdamer Platz lies the German Resistance Memorial Center, located in the Bendlerblock complex.\nIt documents resistance by individuals and groups: from students and workers to clergy and military officers. Exhibits include documents, photographs, and recorded testimonies.\nThe center emphasizes that resistance took many forms and came from all walks of life.\nIt invites visitors to reflect on their own ethical responsibilities today."
    },
    {
        id: '8',
        title: 'Barnimstraße 10 – Women’s Prison',
        coordinates: { latitude: 52.52472, longitude: 13.42556 },
        image: require('../assets/img/Silenterlin-5/2191779_ori1.png'), // Using a placeholder image, replace if you have a specific one
        description: "Barnimstraße Women’s Prison held hundreds of female political prisoners, including members of the Red Orchestra and other underground groups.\nSome, like Hilde Coppi and Cato Bontjes van Beek, were young mothers or students arrested for spreading anti-Nazi material.\nDespite pregnancy or illness, many were sentenced to death and executed at Plötzensee.\nThe prison was demolished in the 1970s, but a plaque marks its location as a tribute to women who resisted tyranny."
    },
    {
        id: '9',
        title: 'Charlottenburg & Westend – Red Orchestra Sites',
        coordinates: { latitude: 52.5130, longitude: 13.2840 }, // Using same coordinates as Westend for now
        image: require('../assets/img/Silenterlin-5/Berlijpanorami1.png'), // Using a placeholder image, replace if you have a specific one
        description: "The Red Orchestra operated from private homes and offices across Berlin, particularly in Westend and Charlottenburg.\nTheir work included espionage, leaflet writing, and coordination with Soviet contacts. Members were diverse: students, artists, soldiers, civil servants.\nAfter mass arrests in 1942, many were sentenced to death.\nThe buildings they used looked ordinary but were hubs of silent resistance."
    },
    {
        id: '10',
        title: 'Wedding & Schöneberg – Stairwells of Resistance',
        coordinates: { latitude: 52.55111, longitude: 13.35694 }, // Using same coordinates as Otto & Elise Hampel
        image: require('../assets/img/Silenterlin-5/1fqwf01.png'), // Using a placeholder image, replace if you have a specific one
        description: "Otto and Elise Hampel left their postcards in public stairwells in districts like Wedding and Schöneberg.\nThis seemingly minor act was in fact radical: their cards urged citizens not to donate to Nazi causes or support the war.\nMost of the cards were turned over to the Gestapo, but their message lingered. They inspired neighbors to think, if not act.\nEvery stairwell they visited became a tiny battlefield for truth."
    },
    {
        id: '11',
        title: 'Westend & Mitte – Hidden Apartments',
        coordinates: { latitude: 52.5130, longitude: 13.2840 }, // Placeholder, as "Approx. Westend / Mitte" is too vague for exact map coords
        image: require('../assets/img/Silenterlin-5/ChatGP1.png'), // Using a placeholder image, replace if you have a specific one
        description: "Several Berliners risked their lives to shelter Jews and resistance fighters. Among them were the Gloedens, who hid conspirators like Fritz Lindemann.\nTheir apartment wasn’t unique in this bravery. Ordinary people converted their homes into safehouses, trusting strangers over silence.\nSuch hiding places carried the constant threat of betrayal.\nThey were quiet acts of civil courage amidst overwhelming fear."
    },
    {
        id: '12',
        title: 'Church Basements – Underground Meetings',
        coordinates: { latitude: 52.53000, longitude: 13.41000 }, // Using "Approx. 52.53000, 13.41000"
        image: require('../assets/img/Silenterlin-5/Berlin_Potsdamer_Platz_early_1900s_Grand_Hotel_Bellevue.png'), // Using a placeholder image, replace if you have a specific one
        description: "Several Berlin churches hosted secret gatherings of student groups and underground activists.\nHere, members discussed philosophy, distributed anti-Hitler material, and planned actions. Church basements offered temporary shelter from Gestapo surveillance.\nThey were places where ethics were debated in the shadows, where voices rose against oppression despite the danger.\nFaith, silence, and resistance intersected beneath sacred ground."
    }
];

const markerIcon = require('../assets/img/c266ba0bbf32e649b7dff1d515ccdd1262348103.png'); // Иконка PNG

export default function HomeScreen() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <View style={styles.container}>
            {selectedLocation && (
                <View style={styles.infoCardTop}>
                    <View style={styles.infoHeader}>
                        <Image source={selectedLocation.image} style={styles.infoImage} />
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoTitle}>{selectedLocation.title}</Text>
                            <Text style={styles.coordinates}>
                                📍 {selectedLocation.coordinates.latitude}, {selectedLocation.coordinates.longitude}
                            </Text>
                        </View>
                    </View>

                    <ScrollView style={styles.infoBody}>
                        <Text style={styles.infoDescription}>{selectedLocation.description}</Text>
                    </ScrollView>

                    <TouchableOpacity onPress={() => setSelectedLocation(null)} style={styles.closeButton}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
            )}

            <MapView
                style={styles.map}
                // provider={PROVIDER_GOOGLE} // Uncomment if you specifically want Google Maps provider
                initialRegion={{
                    latitude: 52.52, // Center of Berlin
                    longitude: 13.38, // Center of Berlin
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                customMapStyle={darkMapStyle}
            >
                {LOCATIONS.map((loc) => (
                    <Marker
                        key={loc.id}
                        coordinate={loc.coordinates}
                        onPress={() => setSelectedLocation(loc)}
                    >
                        <Image
                            source={markerIcon}
                            style={{ width: 50, height: 50, resizeMode: 'contain', }}
                        />
                    </Marker>

                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0d0d',
    },
    map: {
        flex: 1,
    },
    infoCardTop: {
        position: 'absolute',
        top: 0,
        paddingTop: 70, // Added padding for status bar/notch
        width: '100%',
        backgroundColor: '#400000',
        padding: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        zIndex: 10,
        borderWidth: 3, // Added border
        borderColor: '#DCC8A0', // Added border color
    },
    infoHeader: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 12,
        resizeMode: 'cover', // Ensure image covers the area
    },
    infoTextContainer: {
        flex: 1,
    },
    infoTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 26,
        fontFamily: 'Cormorant',
    },
    coordinates: {
        color: '#ccc',
        fontSize: 12,
        marginTop: 4,
    },
    infoBody: {
        maxHeight: 120, // Limit height of scrollable description
        marginTop: 8,
    },
    infoDescription: {
        color: '#eee',
        fontFamily: 'Cormorant',
        fontSize: 24,
    },
    closeButton: {
        marginTop: 10,
        alignSelf: 'center',
        backgroundColor: '#800000',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 20,
        shadowColor: '#000', // Added shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    closeText: {
        color: '#fff',
        fontFamily: 'Cormorant',
        fontWeight: '600',
    },
});

const darkMapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#1d1d1d' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#cfcfcf' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#000000' }] },
    { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#2e2e2e' }] },
    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#2b2b2b' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#3c3c3c' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
];
