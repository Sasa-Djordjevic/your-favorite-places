import { useContext } from "react";
import { View, Pressable, Image, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { ThemeContxt } from "../../store/theme-context";

function PlaceItem({ place, onSelect }) {
    const themeCtx = useContext(ThemeContxt);
    const themeMode = themeCtx.theme;

    return (
        <Pressable 
            onPress={onSelect.bind(this, place.id)}
            style={({pressed}) => [styles.item, pressed && styles.pressed]}
        >
            <Image source={{ uri: place.imageUri}} style={styles.image} />
            <View style={styles.info}>
                <Text style={[styles.title, {color: Colors[themeMode].gray700}]}>{place.title}</Text>
                <Text style={[styles.date, {color: Colors[themeMode].gray700}]}>{place.date}</Text>
            </View>
        </Pressable>
    );
};

export default PlaceItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "flex-start",
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: Colors.primary400,
        elevation: 2,
        shadowColor: "black",
        shadowOpacity: 0.15,
        shadowOffset: { width: 1, height: 1},
        shadowRadius: 2
    },
    pressed: {
        opacity: 0.9
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100
    },
    info: {
        flex: 2,
        padding: 12
    },
    title: {
        fontWeight: "bold",
        fontSize: 18
    },
    date: {
        fontSize: 12
    }
});