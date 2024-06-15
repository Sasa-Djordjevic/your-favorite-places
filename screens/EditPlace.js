import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import EditPlaceForm from "../components/Places/EditPlaceForm";
import { fetchPlaceDetails, editPlace } from "../util/database";
import IconButtonNS from "../components/UI/IconButtonNS";
import { Colors } from "../constants/colors";
import { ThemeContxt } from "../store/theme-context";

function EditPlace({route, navigation}) {
    const [fetchedPlace, setFetchedPlace] = useState();

    const themeCtx = useContext(ThemeContxt);
    const themeMode = themeCtx.theme;

    const placeId = route.params.placeId;

    function goBackHandler() {
        navigation.goBack();
    }

    useEffect(() => {
        async function loadPlaceDetails() {
            const place = await fetchPlaceDetails(placeId);

            setFetchedPlace(place);
        }

        loadPlaceDetails();

    }, [placeId]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButtonNS
                  icon="arrow-down-circle-outline"
                  size={32}
                  color={Colors[themeMode].gray700}
                  onPress={goBackHandler}
                />
              )
        });
    }, [goBackHandler, navigation]);

    async function editPlaceHandler(place) {
        await editPlace(place);

        navigation.navigate("PlaceDetails", {
            placeId: placeId,
            isEditPlaceData: true
        });
    }

    if (!fetchedPlace) {
        return (
            <View style={styles.fallback}>
                <Text style={styles.text}>Loading place data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.screenContainer}>
            <EditPlaceForm 
                onEditPlace={editPlaceHandler} 
                cancelHandler={goBackHandler}
                placeId={placeId}
                placeImageUri={fetchedPlace.imageUri}
                placeTitle={fetchedPlace.title}
                placeAddress={fetchedPlace.address}
                placeDescription={fetchedPlace.description}
                placeCategory={fetchedPlace.category}
                placeDate={fetchedPlace.date}
            />
        </View>
    );
}

export default EditPlace;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: "center"
    },
    fallback: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: Colors.primary500,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16
    },
});