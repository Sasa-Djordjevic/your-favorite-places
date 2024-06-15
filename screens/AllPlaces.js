import { FlatList, StyleSheet, View } from "react-native";
import { categories } from "../util/categories";

import CategoryTile from "../components/Categories/CategoryTile";

function AllPlaces({navigation}) {
    
    function renderCategoryItem(itemData) {

        function onPressHandler() {
            navigation.navigate('PlaceCategory', {
                categoryName: itemData.item.name
            })
        }

        return (
            <CategoryTile 
                title={itemData.item.name}
                icon={itemData.item.icon}
                onPress={onPressHandler}
            />
        );
    }
    
    return (
        <View style={styles.screenContainer}>
            <FlatList 
                data={categories}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                style={styles.screenFlatList}
            />
        </View>
    );
};

export default AllPlaces;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: "center"
    },
    screenFlatList: {
        width: "100%",
        maxWidth: 600
    }
});

