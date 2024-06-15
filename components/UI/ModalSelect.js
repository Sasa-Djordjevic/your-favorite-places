import { Modal, View, ScrollView, Text, Pressable, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

import Button from "./Button";

function ModalSelect({visible, closeModal, items, title, onPress}) {
    
    return (
        <Modal 
            visible={visible} 
            onRequestClose={closeModal}
            animationType="slide" 
            transparent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <ScrollView 
                        contentContainerStyle={styles.modalContentContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            items.map((item) => (
                                    <View key={item.id}>
                                        <Pressable 
                                            onPress={() => onPress(item.name)}
                                            style={({pressed}) => pressed && styles.pressed}
                                        >
                                            <Text style={styles.itemStyle}>{item.name}</Text>
                                        </Pressable>
                                    </View>
                                )
                            )
                        }
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        <Button onPress={closeModal}>Cancel</Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default ModalSelect;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(34, 28, 48, 0.65)",
    },
    modalContent: {
        width: "70%",
        maxWidth: 400,
        maxHeight: "50%",
        backgroundColor: Colors.primary100,
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    modalContentContainer: {
        paddingTop: 24,
        paddingBottom: 8,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
    },
    titleContainer: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.primary500,
        paddingBottom: 4
    },
    buttonContainer: {
        paddingTop: 16
    },
    itemStyle: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 16,
        textTransform: "capitalize"
    },
    pressed: {
        opacity: 0.5
    }
});
