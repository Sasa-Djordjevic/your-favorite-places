import { FlatList, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

function PlacesList({places}) {
    const navigation = useNavigation();

    const numberOfPlaces = places ? places.length : 0;
    const numberOfPlacesFormat = numberOfPlaces < 10 ? `0${numberOfPlaces}` : numberOfPlaces;

    function selectPlaceHandler(id) {
        navigation.navigate("PlaceDetails", {
            placeId: id,
            isEditPlaceData: false
        });
    }

    if(!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>No favorite places added yet - start adding!</Text>
            </View>
        );
    }

    return (
        <>
            <View>
                <Text style={styles.textNumber}>{numberOfPlacesFormat}/50</Text>
            </View>
            <FlatList 
                data={places} 
                keyExtractor={(item) => item.id} 
                renderItem={({item}) => <PlaceItem place={item} onSelect={selectPlaceHandler} />}
                style={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </>
    );
}

export default PlacesList;

const styles = StyleSheet.create({
    list: {
        //marginHorizontal: 24,
        marginBottom: 24,
        width: "100%",
        maxWidth: 500
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    },
    textNumber: {
        color: Colors.primary400,
        textAlign: "center",
        paddingVertical: 4
    }
});