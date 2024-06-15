import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function IconButtonNS({icon, color, size, onPress}) {
    return (
        <Pressable
            style={({pressed}) => [styles.button, pressed && styles.pressed]}
        >
            <Ionicons name={icon} color={color} size={size} onPress={onPress}/>
        </Pressable>
    );
}

export default IconButtonNS;

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
    },
    pressed: {
        opacity: 0.4
    }
});