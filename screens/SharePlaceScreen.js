import { useState, useEffect, useRef, useContext } from "react";
import { ScrollView, View, Text, Image, Switch, StyleSheet, Platform, Alert } from "react-native";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { ThemeContxt } from "../store/theme-context";

import OutlineButton from "../components/UI/OutlinedButton";
import IconButtonNS from "../components/UI/IconButtonNS";

function SharePlaceScreen({route, navigation}) {
    const viewRef = useRef();
    const [fetchedPlace, setFetchedPlace] = useState();
    const [shareElements, setShareElements] = useState({
        title: true,
        address: true,
        description: true,
        date: true,
        category: true
    });

    const themeCtx = useContext(ThemeContxt);
    const themeMode = themeCtx.theme;

    const selectedPlaceId = route.params.placeId;

    function shareToggler(identifier) {
        setShareElements((curentElements) => {
            return {
                ...curentElements,
                [identifier] : !curentElements[identifier]
            }
        });
    }
   
    async function shareHandler() {
        try {
            const shareElement = await captureRef(viewRef, {
                format: 'png',
                quality: 0.7
            });

            await Sharing.shareAsync(shareElement);

        } catch(error) {
            Alert.alert("Something went wrong", "We are unable to share this content. Please try again.");
        }
    }

    useEffect(() => {
        async function loadPlaceDetails() {
            const place = await fetchPlaceDetails(selectedPlaceId);

            function goBackHandler() {
                navigation.goBack();
            }

            setFetchedPlace(place);

            navigation.setOptions({
                headerRight: () => (
                    <IconButtonNS
                      icon="arrow-down-circle-outline"
                      size={32}
                      color={Colors[themeMode].gray700}
                      onPress={goBackHandler}
                    />
                  )
            })
        }

        loadPlaceDetails();

    }, [selectedPlaceId]);

    if (!fetchedPlace) {
        return (
            <View style={styles.fallback}>
                <Text style={styles.text}>Loading place data...</Text>
            </View>
        );
    }

    const titleElement = <View><Text style={styles.title}>{fetchedPlace.title}</Text></View>;
    const addressElement = (
        <View style={styles.addressContainer}>
            <Text style={styles.textTitle}>Address</Text>
            <Text style={styles.text}>{fetchedPlace.address}</Text>
        </View>
    );
    const descriptionElement = <Text style={[styles.text, styles.description]}>{fetchedPlace.description}</Text>;
    const dateElement = (
        <View style={styles.infoContainer}>
            <Text style={styles.textTitle}>Date:</Text>
            <Text style={styles.text}>{fetchedPlace.date}</Text>
        </View>
    );
    const categoryElement = (
        <View style={styles.infoContainer}>
            <Text style={styles.textTitle}>Category:</Text>
            <Text style={[styles.text, styles.upper]}>{fetchedPlace.category}</Text>
        </View>
    );

    const showWhiteSeparator = !shareElements.title && !shareElements.address && !shareElements.date && !shareElements.category;

    return (
        <View style={styles.screenContainer}>
            <ScrollView
                style={styles.screenScrollView}
                showsVerticalScrollIndicator={false}
            >
                <View 
                    ref={viewRef} 
                    collapsable={false} 
                    style={{backgroundColor: Colors[themeMode].gray700}}
                >
                    <Image 
                        style={styles.image} 
                        source={{uri: fetchedPlace.imageUri}}
                    />
                    <View style={styles.dataContainer}>
                        <View style={styles.textContainer}>
                            {!showWhiteSeparator && <View style={styles.whiteSeparator}></View>}
                            {shareElements.title && titleElement}
                            {shareElements.address && addressElement}
                            {shareElements.description && descriptionElement}
                            {shareElements.date && dateElement}
                            {shareElements.category && categoryElement}
                            {!showWhiteSeparator && <View style={styles.whiteSeparator}></View>}
                        </View>
                    </View>    
                </View>
                <View style={styles.settingsContainer}>
                    <View style={styles.separator}></View>
                    <View style={styles.outlineButtonContainer}>
                        <OutlineButton 
                            icon="share-social-outline"
                            color={Colors.primary500}
                            styleCustom={styles.button}
                            onPress={shareHandler}
                        >Share</OutlineButton>
                    </View>
                    <View style={styles.modeContainer}>
                        <Text style={styles.switchTitle}>Share with the Image</Text>
                        <View style={styles.switchElement}>
                            <Text style={[styles.switchText, {color: Colors[themeMode].gray700}]}>Title</Text>
                            <Switch 
                                value={shareElements.title} 
                                onValueChange={shareToggler.bind(this, "title")} 
                                trackColor={{false: Colors.primary100, true: Colors.primary500}} 
                                thumbColor={Colors.primary700}
                            />
                        </View>
                        <View style={styles.switchElement}>
                            <Text style={[styles.switchText, {color: Colors[themeMode].gray700}]}>Address</Text>
                            <Switch 
                                value={shareElements.address} 
                                onValueChange={shareToggler.bind(this, "address")} 
                                trackColor={{false: Colors.primary100, true: Colors.primary500}} 
                                thumbColor={Colors.primary700}
                            />
                        </View>
                        <View style={styles.switchElement}>
                            <Text style={[styles.switchText, {color: Colors[themeMode].gray700}]}>Description</Text>
                            <Switch 
                                value={shareElements.description} 
                                onValueChange={shareToggler.bind(this, "description")} 
                                trackColor={{false: Colors.primary100, true: Colors.primary500}} 
                                thumbColor={Colors.primary700}
                            />
                        </View>
                        <View style={styles.switchElement}>
                            <Text style={[styles.switchText, {color: Colors[themeMode].gray700}]}>Date</Text>
                            <Switch 
                                value={shareElements.date} 
                                onValueChange={shareToggler.bind(this, "date")} 
                                trackColor={{false: Colors.primary100, true: Colors.primary500}} 
                                thumbColor={Colors.primary700}
                            />
                        </View>
                        <View style={styles.switchElement}>
                            <Text style={[styles.switchText, {color: Colors[themeMode].gray700}]}>Category</Text>
                            <Switch 
                                value={shareElements.category} 
                                onValueChange={shareToggler.bind(this, "category")} 
                                trackColor={{false: Colors.primary100, true: Colors.primary500}} 
                                thumbColor={Colors.primary700}
                            />
                        </View>
                    </View>    
                </View>
            </ScrollView>
        </View>
    );
}

export default SharePlaceScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: "center"
    },
    screenScrollView: {
        width: "100%",
        maxWidth: 500
    },
    fallback: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        //height: "35%",
        minHeight: 300,
        width: "100%"
    },
    dataContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    textContainer: {
        width: "90%",
        //paddingVertical: 16,
        paddingHorizontal: 4,
    },
    whiteSeparator: {
        height: 8
    },
    title: {
        color: Colors.primary500,
        fontWeight: "bold",
        fontSize: 22,
        marginBottom: 8
    },
    addressContainer: {
        marginBottom: 8
    },
    textTitle: {
        fontSize: 14,
        color: Colors.primary700,
        fontStyle: "italic"
    },
    text: {
        color: Colors.primary500,
        fontSize: 16
    },
    description: {
        marginTop: 16,
        marginBottom: 24,
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 4
    },
    upper: {
        textTransform: "capitalize"
    },
    settingsContainer: {
        alignItems: "center",
        paddingBottom: 40,
    },
    separator: {
        width: "90%",
        height: 1,
        backgroundColor: Colors.primary500
    },
    outlineButtonContainer: {
        width: "90%",
        flexDirection: "row",
        paddingVertical: 20
    },
    button: {
        flex: 1
    },
    modeContainer: {
        width: "80%",
        backgroundColor: Colors.primary400,
        paddingTop: 16,
        paddingBottom: 8,
        paddingHorizontal: 16,
        marginHorizontal: 4,
        borderRadius: 8
    },
    switchTitle: {
        color: Colors.primary700,
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8
    },
    switchText: {
        fontSize: 16
    },
    switchElement: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.primary200,
        marginBottom: 16,
        paddingVertical: Platform.OS === "android" ? 0 : 8,
        paddingLeft: 24,
        paddingRight: 8,
        borderRadius: 30
    },
});