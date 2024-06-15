import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

function IconButton({icon, color, size, onPress}) {
    return (
        <Pressable
            style={({pressed}) => [styles.button, pressed && styles.pressed]}
        >
            <Ionicons name={icon} color={color} size={size} onPress={onPress}/>
        </Pressable>
    );
}

export default IconButton;

const styles = StyleSheet.create({
    button: {
        marginRight: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary500
    },
    pressed: {
        opacity: 0.4
    }
});