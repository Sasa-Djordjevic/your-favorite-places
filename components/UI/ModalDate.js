import { Modal, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import DateTimePicker from '@react-native-community/datetimepicker';

import Button from "./Button";

function ModalDate({visible, closeModal, title, onChangeDate, dateValue, confirmModal}) {
    
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
                    <DateTimePicker 
                        mode="date"
                        display="spinner"
                        value={dateValue}
                        onChange={onChangeDate}
                    />
                    <View style={styles.buttonContainer}>
                        <Button onPress={closeModal} styleCustom={styles.button}>Cancel</Button>
                        <Button onPress={confirmModal} styleCustom={styles.button}>Ok</Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default ModalDate;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(34, 28, 48, 0.65)",
    },
    modalContent: {
        width: "70%",
        maxWidth: 500,
        backgroundColor: Colors.primary100,
        paddingHorizontal: 16,
        paddingVertical: 24,
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
    itemStyle: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 16,
        textTransform: "capitalize"
    },
    pressed: {
        opacity: 0.5
    },
    buttonContainer: {
        flexDirection: "row"
    },
    button: {
        flex: 1
    }
});
