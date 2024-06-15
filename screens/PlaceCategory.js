import { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { fetchCategoryPlaces } from "../util/database";
import { capitalizeFirstLetter } from "../util/capitalizeFirstLetter";
import { Colors } from "../constants/colors";
import { ThemeContxt } from "../store/theme-context";

import PlacesList from "../components/Places/PlacesList";
import IconButtonNS from "../components/UI/IconButtonNS";

function PlaceCategory({route, navigation}) {
    const themeCtx = useContext(ThemeContxt);
    const themeMode = themeCtx.theme;

    const [loadedPlaces, setLoadedPlaces] = useState([]);

    const categoryName = route.params.categoryName;

    const categoryNameTitle = categoryName ? capitalizeFirstLetter(categoryName) + " Places" : "Favorite Places";

    const isFocused = useIsFocused();

    useEffect(() => {
        async function loadPlaces() {
            const places = await fetchCategoryPlaces(categoryName);

            setLoadedPlaces(places);
        }

        function goBackHandler() {
            navigation.goBack();
        }

        if (isFocused) {
            loadPlaces();
        }

        navigation.setOptions({
            title: categoryNameTitle,
            headerRight: () => (
                <IconButtonNS
                  icon="arrow-down-circle-outline"
                  size={32}
                  color={Colors[themeMode].gray700}
                  onPress={goBackHandler}
                />
              )
        })

    }, [categoryName,isFocused]);

    return (
        <View style={styles.screenContainer}>
            <PlacesList places={loadedPlaces} />
        </View>
    );
}

export default PlaceCategory;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 24
    },
});
