import { View, StyleSheet } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({navigation}) {

    async function createPlaceHandler(place) {
        await insertPlace(place);

        navigation.navigate('AllPlaces');
    }

    return (
        <View style={styles.screenContainer}>
            <PlaceForm onCreatePlace={createPlaceHandler} />
        </View>
    );
}

export default AddPlace;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: "center"
    }
});