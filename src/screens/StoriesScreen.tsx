import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Animated,
    ScrollView,
    StyleSheet,
    Dimensions, // Import Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Share from 'react-native-share';


// Add Dimensions for consistent styling
const { width } = Dimensions.get('window');

const stories = [
    {
        id: '1',
        title: 'Amsterdamer Straße 10 – Otto & Elise Hampel',
        coords: '52.55111, 13.35694',
        image: require('../assets/img/Silenterlin-5/1fqwf01.png'), // Ensure this path is correct
        fullText: "Otto and Elise Hampel, a working-class couple from Berlin's Wedding district, began leaving handwritten postcards with anti-Nazi messages in stairwells around the city between 1940 and 1942. These small acts of defiance urged citizens to resist Hitler, boycott the war effort, and reject fascist ideology.\nTheir quiet protest continued for almost two two years until they were betrayed and arrested by the Gestapo.\nIn April 1943, both were executed at Plötzensee Prison for \"undermining military morale.\" Their story was later fictionalized in Hans Fallada’s novel Every Man Dies Alone.\nA plaque now marks their former home, honoring their humble yet powerful resistance."
    },
    {
        id: '2',
        title: 'Plötzensee Prison – Wall of Memory',
        coords: '52.54100, 13.32200',
        image: require('../assets/img/Silenterlin-5/2191779_ori1.png'),
        fullText: "Plötzensee Prison became one of Nazi Germany's main execution sites for political prisoners. Between 1933 and 1945, more than 2,800 people were executed here, including many from the German Resistance.\nThese included members of the Red Orchestra, the White Rose, and the July 20 Plot. Executions were carried out by hanging or beheading, often in groups.\nToday, the prison is a solemn memorial. The original execution shed has been preserved, with a wall of names and a permanent exhibition dedicated to victims.\nThis site stands as a powerful reminder of how resistance, even when punished, leaves a legacy."
    },
    {
        id: '3',
        title: 'Bendlerblock – July 20 Plot',
        coords: '52.50778, 13.36250',
        image: require('../assets/img/Silenterlin-5/7183227805_144ff572d2_b.png'),
        fullText: "Bendlerblock was the headquarters of the July 20, 1944 assassination attempt on Hitler, also known as Operation Valkyrie. Colonel Claus von Stauffenberg planted a bomb at Hitler's Eastern Front HQ and returned to Berlin to initiate a coup.\nAfter the plan failed, Stauffenberg and his co-conspirators were arrested and executed in the courtyard that same night.\nToday, Bendlerblock houses the German Resistance Memorial Center, which documents the diverse forms of opposition to the Nazi regime.\nIt honors not only the plotters but the moral courage behind their actions."
    },
    {
        id: '4',
        title: 'Kastanienallee 23 – Elisabeth & Erich Gloeden',
        coords: '52.51028, 13.26861',
        image: require('../assets/img/Silenterlin-5/ChatGP1.png'),
        fullText: "Elisabeth Charlotte \"Lilo\" Gloeden and her husband Erich sheltered General Fritz Lindemann, a key figure in the July 20 plot, in their apartment in Westend.\nWhen the Gestapo raided the flat in September 1944, the Gloedens and Lilo's mother were arrested. All three were sentenced to death and executed at Plötzensee.\nTheir Stolpersteine (\"stumbling stones\") still mark their former residence.\nTheir courage to harbor a fugitive was a testament to the civilian resistance within Nazi Germany."
    },
    {
        id: '5',
        title: 'Westend – Harro & Libertas Schulze-Boysen',
        coords: '52.5130, 13.2840',
        image: require('../assets/img/Silenterlin-5/Berlijpanorami1.png'),
        fullText: "Harro and Libertas Schulze-Boysen were central figures in the Red Orchestra, an anti-Nazi resistance and intelligence network.\nLibertas worked at the Ministry of Propaganda and secretly collected evidence of Nazi crimes. Harro, an officer in the Luftwaffe, used his position to pass information to the Allies.\nThey were arrested in 1942, interrogated, and executed at Plötzensee.\nTheir apartment in Westend was both a home and a resistance cell, driven by intellect, love, and defiance."
    },
    {
        id: '6',
        title: 'Humboldt University – White Rose Leaflets',
        coords: '52.51806, 13.39333',
        image: require('../assets/img/Silenterlin-5/Berlin_Potsdamer_Platz_early_1900s_Grand_Hotel_Bellevue.png'),
        fullText: "Though based in Munich, the White Rose resistance group distributed their leaflets across Germany, including Berlin’s Humboldt University.\nThese leaflets, written by Hans and Sophie Scholl and others, called for civil disobedience and condemned the Nazi regime's atrocities.\nStudents in Berlin photocopied and passed them around lecture halls and staircases. Possessing them was punishable by death.\nTheir distribution at Humboldt showed how ideas could travel and spark moral reckoning across cities."
    },
    {
        id: '7',
        title: 'Potsdamer Platz – German Resistance Memorial Center',
        coords: '52.50966, 13.37648',
        image: require('../assets/img/Silenterlin-5/rftyguhi.png'),
        fullText: "Near Potsdamer Platz lies the German Resistance Memorial Center, located in the Bendlerblock complex.\nIt documents resistance by individuals and groups: from students and workers to clergy and military officers. Exhibits include documents, photographs, and recorded testimonies.\nThe center emphasizes that resistance took many forms and came from all walks of life.\nIt invites visitors to reflect on their own ethical responsibilities today."
    },
    // {
    //     id: '8',
    //     title: 'Barnimstraße 10 – Women’s Prison',
    //     coords: '52.52472, 13.42556',
    //     image: require('../assets/img/3846b4072fc805111bac61501460cddef231e77d.jpg'),
    //     fullText: "Barnimstraße Women’s Prison held hundreds of female political prisoners, including members of the Red Orchestra and other underground groups.\nSome, like Hilde Coppi and Cato Bontjes van Beek, were young mothers or students arrested for spreading anti-Nazi material.\nDespite pregnancy or illness, many were sentenced to death and executed at Plötzensee.\nThe prison was demolished in the 1970s, but a plaque marks its location as a tribute to women who resisted tyranny."
    // },
    // {
    //     id: '9',
    //     title: 'Charlottenburg & Westend – Red Orchestra Sites',
    //     coords: '52.5130, 13.2840',
    //     image: require('../assets/img/3846b4072fc805111bac61501460cddef231e77d.jpg'),
    //     fullText: "The Red Orchestra operated from private homes and offices across Berlin, particularly in Westend and Charlottenburg.\nTheir work included espionage, leaflet writing, and coordination with Soviet contacts. Members were diverse: students, artists, soldiers, civil servants.\nAfter mass arrests in 1942, many were sentenced to death.\nThe buildings they used looked ordinary but were hubs of silent resistance."
    // },
    // {
    //     id: '10',
    //     title: 'Wedding & Schöneberg – Stairwells of Resistance',
    //     coords: '52.55111, 13.35694',
    //     image: require('../assets/img/3846b4072fc805111bac61501460cddef231e77d.jpg'),
    //     fullText: "Otto and Elise Hampel left their postcards in public stairwells in districts like Wedding and Schöneberg.\nThis seemingly minor act was in fact radical: their cards urged citizens not to donate to Nazi causes or support the war.\nMost of the cards were turned over to the Gestapo, but their message lingered. They inspired neighbors to think, if not act.\nEvery stairwell they visited became a tiny battlefield for truth."
    // },
    // {
    //     id: '11',
    //     title: 'Westend & Mitte – Hidden Apartments',
    //     coords: 'Approx. Westend / Mitte', // Kept as string, consider parsing if you need actual coordinates
    //     image: require('../assets/img/3846b4072fc805111bac61501460cddef231e77d.jpg'),
    //     fullText: "Several Berliners risked their lives to shelter Jews and resistance fighters. Among them were the Gloedens, who hid conspirators like Fritz Lindemann.\nTheir apartment wasn’t unique in this bravery. Ordinary people converted their homes into safehouses, trusting strangers over silence.\nSuch hiding places carried the constant threat of betrayal.\nThey were quiet acts of civil courage amidst overwhelming fear."
    // },
    // {
    //     id: '12',
    //     title: 'Church Basements – Underground Meetings',
    //     coords: 'Approx. 52.53000, 13.41000', // Kept as string, consider parsing if you need actual coordinates
    //     image: require('../assets/img/3846b4072fc805111bac61501460cddef231e77d.jpg'),
    //     fullText: "Several Berlin churches hosted secret gatherings of student groups and underground activists.\nHere, members discussed philosophy, distributed anti-Hitler material, and planned actions. Church basements offered temporary shelter from Gestapo surveillance.\nThey were places where ethics were debated in the shadows, where voices rose against oppression despite the danger.\nFaith, silence, and resistance intersected beneath sacred ground."
    // }
];

export default function StoriesScreen() {
    const [search, setSearch] = useState('');
    const [sortAsc, setSortAsc] = useState(true);
    const [filtered, setFiltered] = useState(stories);
    const [animations, setAnimations] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const filteredStories = stories
            .filter((story) =>
                story.title.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) =>
                sortAsc
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
            );

        setFiltered(filteredStories);

        // Reset and re-initialize animations for filtered stories
        const anims = filteredStories.map(() => new Animated.Value(0));
        setAnimations(anims);

        // Staggered animation
        Animated.stagger(100,
            anims.map((anim) =>
                Animated.timing(anim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                })
            )
        ).start();
    }, [search, sortAsc]);

    const handleShare = async (item) => {

        const shareOptions = {
            title: `Read about: ${item.title}`,
            message: `${item.title}\n\n${item.fullText}\n\nLearn more at https://example.com/story/${item.id}`,
            // Optional: You can also include url
            // url: 'https://example.com/story/' + item.id,
        };

        await Share.open(shareOptions);


    };

    return (
        <ImageBackground
            source={require('../assets/img/4c21b770ee8a793ac0683e7f3970a3e396057496.png')} // Your background image
            style={styles.container}
            resizeMode="cover" // Ensure cover mode for background
        >
            <View style={styles.topControls}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search stories..."
                    placeholderTextColor="#ccc"
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity
                    onPress={() => setSortAsc(!sortAsc)}
                    style={styles.sortButton}
                >
                    <Text style={styles.sortText}>{sortAsc ? 'A-Z' : 'Z-A'}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContainer}>
                {filtered.map((item, index) => (
                    <Animated.View
                        key={item.id}
                        style={{
                            opacity: animations[index] || 1, // Use fallback for initial render if needed
                            transform: [
                                {
                                    translateY: (animations[index] || new Animated.Value(1)).interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [40, 0],
                                    }),
                                },
                            ],
                        }}
                    >
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Image source={item.image} style={styles.cardImage} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                    <View style={styles.coordRow}>
                                        <Image
                                            source={require('../assets/img/c266ba0bbf32e649b7dff1d515ccdd1262348103.png')} // Your coordinate icon
                                            style={styles.coordIcon}
                                        />
                                        <Text style={styles.coordsText}>{item.coords}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.cardFooter}>
                                <TouchableOpacity
                                    style={styles.readButton}
                                    onPress={() =>
                                        navigation.navigate('StoryDetail', { story: item }) // Pass the full item, including fullText
                                    }
                                >
                                    <Text style={styles.readText}>READ</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.shareButton} onPress={()=>{handleShare(item)}}>
                                    {/* You might want to add a share icon here instead of text */}
                                    <Text style={styles.readText}>SHARE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                ))}
                <View style={{marginBottom: 100}}/>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100, // Space for status bar/notch and potential header
        backgroundColor: '#1a1a1a', // Fallback background color
    },
    topControls: {
        flexDirection: 'row',
        padding: 16,
        paddingBottom: 0,
        gap: 12,
        // Added for better visual consistency with card width
        width: width,
        justifyContent: 'center',
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#2e2e2e',
        borderRadius: 12,
        paddingHorizontal: 14,
        color: '#fff',
        height: 40,
        maxWidth: width * 0.7, // Limit search input width
    },
    sortButton: {
        backgroundColor: '#800000',
        paddingHorizontal: 16,
        justifyContent: 'center',
        borderRadius: 12,
    },
    sortText: {
        color: '#fff',
        fontFamily: 'Cormorant',
        fontWeight: 'bold',
    },
    scrollContainer: {
        flex: 1, // Ensure scroll container takes available space
        padding: 16,
        paddingBottom: 32, // More padding at the bottom for content that might be cut off by navigation tabs
    },
    card: {
        backgroundColor: '#400000',
        borderRadius: 20,
        padding: 12,
        marginBottom: 24,
        borderWidth: 3,
        borderColor: '#DCC8A0',
        width: '100%', // Ensure cards take full width of their container
        alignSelf: 'center', // Center cards if scrollContainer has padding
    },
    cardHeader: {
        flexDirection: 'row',
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 12,
        resizeMode: 'cover', // Ensure image covers the area
    },
    cardTitle: {
        color: '#f9f0e6',
        fontSize: 26,
        fontFamily: 'Cormorant',
        fontWeight: 'bold',
        marginBottom: 6,
        flexShrink: 1, // Allow text to wrap
    },
    coordRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4, // Spacing from title
    },
    coordIcon: {
        width: 26,
        height: 30,
        marginRight: 6,
        resizeMode: 'contain',
    },
    coordsText: {
        color: '#e9d8b5',
        fontSize: 13,
    },
    cardFooter: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    readButton: {
        backgroundColor: '#B22C2C',
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 12,
        elevation: 2,
    },
    readText: {
        fontFamily: 'Cormorant',
        color: '#F6EAD7',
        fontSize: 18,
        fontWeight: '600',
    },
    shareButton: {
        backgroundColor: '#A03030',
        paddingVertical: 8, // Added padding for consistency
        paddingHorizontal: 20, // Adjusted padding
        borderRadius: 12, // Consistent border radius
        elevation: 2,
        // If you use an icon, you might just need padding: 8
    },
    shareIcon: {
        width: 20,
        height: 20,
        tintColor: '#fff',
    },
});
