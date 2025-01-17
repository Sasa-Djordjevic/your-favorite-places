import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../../constants/colors";

function OutlineButton({onPress, icon, color, styleCustom, children}) {
    return (
        <Pressable 
            onPress={onPress} 
            style={({pressed}) => [styles.button, pressed && styles.pressed, styleCustom]}
        >
            <Ionicons 
                name={icon} 
                size={20} 
                color={color} 
                style={styles.icon} 
            />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};

export default OutlineButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.primary500
    },
    pressed: {
        opacity: 0.7
    },
    icon: {
        marginRight: 6
    },
    text: {
        color: Colors.primary500
    }
});