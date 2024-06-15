import { useContext } from "react";
import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
import { Colors } from "../../constants/colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeContxt } from "../../store/theme-context";

function CategoryTile({title, icon, onPress}) {
    const themeCtx = useContext(ThemeContxt);
    const themeMode = themeCtx.theme;

    return (
        <View style={styles.tileContainer}>
            <Pressable
                style={({pressed}) => [styles.button, pressed && styles.pressed] }
                onPress={onPress}
            >
                <View style={styles.innerContainer}>
                    <Ionicons 
                        name={icon}
                        color={Colors[themeMode].gray700}
                        size={40}
                     />
                    <Text style={[styles.text, {color: Colors[themeMode].gray700}]}>{title}</Text>
                </View>
            </Pressable>
        </View>
        
    );
}

export default CategoryTile;

const styles = StyleSheet.create({
    tileContainer: {
        flex: 1,
        margin: 16,
        height: 130,
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 8,
        overflow: Platform.OS === "android" ? "hidden" : "visible"
    },
    button: {
        flex: 1
    },
    pressed: {
        opacity: 0.75
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary400
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
        textTransform: "capitalize",
        marginTop: 8
    }
});