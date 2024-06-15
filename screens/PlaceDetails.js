import { useState, useEffect, useContext } from "react";
import { ScrollView, View, Text, Image, StyleSheet, Alert } from "react-native";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails, deletePlace } from "../util/database";
import * as FileSystem from "expo-file-system";
import { ThemeContxt } from "../store/theme-context";

import Button from "../components/UI/Button";
import OutlineButton from "../components/UI/OutlinedButton";
import IconButtonNS from "../components/UI/IconButtonNS";

function PlaceDetails({route, navigation}) {
    const [fetchedPlace, setFetchedPlace] = useState();

    const themeCtx = useContext(ThemeContxt);
    const themeMode = themeCtx.theme;

    const selectedPlaceId = route.params.placeId;
    const isEditPlaceData = route.params.isEditPlaceData;

    function shareHandler() {
        navigation.navigate('SharePlaceScreen', {
            placeId: selectedPlaceId
        });
    }

    async function deletePlaceHandler(id, image) {
        await deletePlace(id);

        await FileSystem.deleteAsync(image, { idempotent: true });

        navigation.navigate('AllPlaces');
    }

    function deletePlaceHandlerAlert(id, image) {
        function deleteHandler() {
            deletePlaceHandler(id, image);
        }

        Alert.alert('Delete the Place', 'Do you really want to delete the place?', [
            {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: deleteHandler,
                style: 'destructive'
            }
        ] );
    }

    function editPlaceHandler() {
        navigation.navigate('EditPlace', {
            placeId: selectedPlaceId
        });
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

    }, [selectedPlaceId, isEditPlaceData]);

    if (!fetchedPlace) {
        return (
            <View style={styles.fallback}>
                <Text style={styles.text}>Loading place data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.screenContainer}>
            <ScrollView 
                style={styles.screenScrollView}
                showsVerticalScrollIndicator={false}
            >
                <Image 
                    style={styles.image} 
                    source={{uri: fetchedPlace.imageUri}}
                />
                <View style={styles.dataContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{fetchedPlace.title}</Text>
                        <View style={styles.addressContainer}>
                            <Text style={styles.textTitle}>Address:</Text>
                            <Text style={styles.text}>{fetchedPlace.address}</Text>
                        </View>
                        <View>
                            <Text style={styles.textTitle}>Description:</Text>
                            <Text style={[styles.text, styles.description]}>{fetchedPlace.description}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.textTitle}>Date:</Text>
                            <Text style={styles.text}>{fetchedPlace.date}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.textTitle}>Category:</Text>
                            <Text style={[styles.text, styles.upper]}>{fetchedPlace.category}</Text>
                        </View>
                    </View>
                    <View style={styles.outlineButtonContainer}>
                        <OutlineButton 
                            icon="share-social-outline"
                            color={Colors.primary500}
                            styleCustom={styles.button}
                            onPress={shareHandler}
                        >Share Place Details</OutlineButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button 
                            onPress={deletePlaceHandlerAlert.bind(this, fetchedPlace.id, fetchedPlace.imageUri)}
                            styleCustom={styles.button}
                        >Delete</Button>
                        <Button 
                            onPress={editPlaceHandler}
                            styleCustom={styles.button}
                        >Edit</Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default PlaceDetails;

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
        height: "35%",
        minHeight: 300,
        width: "100%"
    },
    dataContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    textContainer: {
        width: "90%",
        paddingVertical: 16,
        paddingHorizontal: 4
    },
    title: {
        color: Colors.primary500,
        fontWeight: "bold",
        fontSize: 22,
        marginBottom: 8
    },
    addressContainer: {
        marginBottom: 16
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
        marginBottom: 24
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 4
    },
    upper: {
        textTransform: "capitalize"
    },
    outlineButtonContainer: {
        width: "90%",
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: Colors.primary500,
        paddingVertical: 20
    },
    buttonContainer: {
        width: "90%",
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: Colors.primary500,
        paddingTop: 20,
        marginBottom: 40
    },
    button: {
        flex: 1,
    }
});