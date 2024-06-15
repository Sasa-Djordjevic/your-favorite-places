import { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, Image, StyleSheet, Platform, KeyboardAvoidingView, Alert } from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import DateTimePicker from '@react-native-community/datetimepicker';
import { categories } from "../../util/categories";
import { formatDate } from "../../util/formatDate";
import { countPlaces } from "../../util/database";
import { capitalizeFirstLetter } from "../../util/capitalizeFirstLetter";

import ImagePicker from "./ImagePicker";
import Button from "../UI/Button";
import ModalSelect from "../UI/ModalSelect";
import ModalDate from "../UI/ModalDate";

function PlaceForm({onCreatePlace}) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [countTitleCharacters, setCountTitleCharacters] = useState(0);
    const [titleIsValid, setTitleIsValid] = useState(true);

    const [enteredAddress, setEnteredAddress] = useState('');
    const [countAddressCharacters, setCountAddressCharacters] = useState(0);
    const [addressIsValid, setAddressIsValid] = useState(true);

    const [enteredDescription, setEnteredDescription] = useState('');
    const [countDescriptionCharacters, setCountDescriptionCharacters] = useState(0);
    const [descriptionIsValid, setDiscriptionIsValid] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState('city');
    const [categoryIsValid, setCategoryIsValid] = useState(true);
    const [modalIsVisible, setModalIsVisible] = useState(false);

    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
    const [dateIsValid, setDateIsValid] = useState(true);
    const [dateModalIsVisible, setDateModalIsVisible] = useState(false);
    const [dateValue, setDateValue] = useState(new Date());

    const [selectedImage, setSelectedImage] = useState('');
    const [imageIsValid, setImageIsValid] = useState(true);
    const [pickedImage, setPickedImage] = useState('');

    function changeCategory(catValue) {
        setSelectedCategory(catValue);
        setCategoryIsValid(true);
        setModalIsVisible(false);
    }

    function openModalHandler() {
        setModalIsVisible(true);
    }

    function closeModalHandler() {
        setModalIsVisible(false);
    }

    function closeDateModalHandler() {
        setDateModalIsVisible(false);
    }

    function openDateModalHandler() {
        setDateModalIsVisible(true);
    }

    function onChangeDate({type}, selectedDate) {
        if (Platform.OS === "android") {
            setDateModalIsVisible(false);
        }

        if (type === "set") {
            const curentDate = selectedDate;

            setDateValue(curentDate);

            if (Platform.OS === "android") {
                setDateModalIsVisible(false);
                setSelectedDate(formatDate(curentDate));
                setDateIsValid(true);
            }
        } else {
            closeDateModalHandler();
        }
    }

    function confirmIOSDate() {
        setSelectedDate(formatDate(dateValue));
        setDateIsValid(true);
        closeDateModalHandler();
    }
    
    
    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
        setTitleIsValid(true);
        setCountTitleCharacters(enteredText.length);
    };

    function changeAddressHandler(enteredAddressText) {
        setEnteredAddress(enteredAddressText);
        setAddressIsValid(true);
        setCountAddressCharacters(enteredAddressText.length);
    }

    function changeDescriptionHandler(enteredDescriptionText) {
        setEnteredDescription(enteredDescriptionText);
        setDiscriptionIsValid(true);
        setCountDescriptionCharacters(enteredDescriptionText.length);
    }

    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);
        setImageIsValid(true);

        setPickedImage(imageUri);
    }

    async function savePlaceHandler() {
        const isTitleValid = enteredTitle.trim().length > 0 && enteredTitle.trim().length < 31;
        const isAddressValid = enteredAddress.trim().length > 0 && enteredAddress.trim().length < 31;
        const isDescriptionValid = enteredDescription.trim().length > 0 && enteredDescription.trim().length < 301;

        const isDateValid = selectedDate.trim().length > 0 && selectedDate.trim().length < 12;
        const isCategoryValid = selectedCategory.trim().length > 0 && categories.findIndex(category => category.name === selectedCategory) >= 0;

        const isImageValid = selectedImage.trim().length > 0;

        if (!isTitleValid || 
            !isAddressValid || 
            !isDescriptionValid || 
            !isDateValid || 
            !isCategoryValid || 
            !isImageValid) {

                setTitleIsValid(isTitleValid);
                setAddressIsValid(isAddressValid);
                setDiscriptionIsValid(isDescriptionValid);
                setCategoryIsValid(isCategoryValid);
                setDateIsValid(isDateValid);
                setImageIsValid(isImageValid);

                return;
        }

        const numberOfPlaces = await countPlaces(selectedCategory);

        if (numberOfPlaces >= 50) {
            Alert.alert(`You already have 50 places in the ${capitalizeFirstLetter(selectedCategory)} category`, 
            `Add the favorite place in another category or delete one of the existing places from the ${capitalizeFirstLetter(selectedCategory)} category.`);
            return;
        }

        const placeData = new Place(
            enteredTitle, 
            enteredAddress, 
            enteredDescription, 
            selectedCategory, 
            selectedDate, 
            selectedImage
        );

        onCreatePlace(placeData);
        
        setEnteredTitle('');
        setEnteredAddress('');
        setEnteredDescription('');
        setSelectedCategory('city');
        setSelectedDate(formatDate(new Date()));
        setSelectedImage('');

        setPickedImage('');

        setCountTitleCharacters(0);
        setCountAddressCharacters(0);
        setCountDescriptionCharacters(0);
    }

    const formIsInvalid = !titleIsValid || 
                        !addressIsValid || 
                        !descriptionIsValid || 
                        !categoryIsValid || 
                        !dateIsValid || 
                        !imageIsValid;

    return (
        <KeyboardAvoidingView
                    style={styles.formContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <ScrollView 
                style={styles.form}
                contentContainerStyle={styles.formScroll}
            >
                {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data.</Text>}
                <View>
                    <View style={styles.labelContainer}>
                        <Text style={[styles.label, !titleIsValid && styles.invalidLabel]}>Title</Text>
                        <Text style={styles.labelCount}>{countTitleCharacters}/30</Text>
                    </View>
                    <TextInput 
                        onChangeText={changeTitleHandler}
                        value={enteredTitle}
                        style={[styles.input, !titleIsValid && styles.invalidInput]}
                        maxLength={30}
                    />
                </View>
                <ImagePicker onTakeImage={takeImageHandler} pickedImage={pickedImage} imageIsValid={imageIsValid} />
                <View style={styles.inputHalfContainer}>
                    <View style={[styles.inputHalf, styles.marginRight]}>
                        <Text style={[styles.label, !categoryIsValid && styles.invalidLabel]}>Category</Text>
                        <Pressable onPress={openModalHandler}>
                            <View style={[styles.input, !categoryIsValid && styles.invalidInput]}>
                                <Text style={styles.inputText}>{selectedCategory}</Text>
                            </View>
                        </Pressable>
                    </View>
                    <View style={[styles.inputHalf, styles.marginLeft]}>
                        <Text style={[styles.label, !dateIsValid && styles.invalidLabel]}>Date</Text>
                        <Pressable onPress={openDateModalHandler}>
                            <View style={[styles.input, !dateIsValid && styles.invalidInput]}>
                                <Text style={styles.inputText}>{selectedDate ? selectedDate : "Date"}</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
                {dateModalIsVisible && Platform.OS === "android" && (
                    <DateTimePicker 
                        mode="date"
                        display="spinner"
                        value={dateValue}
                        onChange={onChangeDate}
                    />
                )}
                {Platform.OS === "ios" && (
                    <ModalDate 
                        visible={dateModalIsVisible} 
                        closeModal={closeDateModalHandler} 
                        confirmModal={confirmIOSDate}
                        title="Select a Date"
                        dateValue={dateValue}
                        onChangeDate={onChangeDate}
                    />
                )}
                <ModalSelect 
                    visible={modalIsVisible} 
                    closeModal={closeModalHandler} 
                    items={categories}
                    onPress={changeCategory}
                    title="Select a Category"
                />
                <View>
                    <View style={styles.labelContainer}>
                        <Text style={[styles.label, !addressIsValid && styles.invalidLabel]}>Address</Text>
                        <Text style={styles.labelCount}>{countAddressCharacters}/30</Text>
                    </View>
                    <TextInput 
                        onChangeText={changeAddressHandler}
                        value={enteredAddress}
                        style={[styles.input, !addressIsValid && styles.invalidInput]}
                        maxLength={30}
                    />
                </View>
                <View>
                    <View style={styles.labelContainer}>
                        <Text style={[styles.label, !descriptionIsValid && styles.invalidLabel]}>Description</Text>
                        <Text style={styles.labelCount}>{countDescriptionCharacters}/300</Text>
                    </View>
                    <TextInput 
                        onChangeText={changeDescriptionHandler}
                        value={enteredDescription}
                        style={[styles.input, styles.inputMultiline, !descriptionIsValid && styles.invalidInput]}
                        multiline={true}
                        maxLength={300}
                    />
                </View>
                <Button onPress={savePlaceHandler}>Add the Place</Button>
                <View style={styles.imageContainer}>
                    <Image 
                        source={require("../../assets/images/Image-decoration-1.png")} 
                        style={styles.image} 
                        resizeMode="contain"
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default PlaceForm;

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        width: "100%",
        maxWidth: 500
    },
    form: {
        flex: 1,
        padding: 24
    },
    formScroll: {
        paddingBottom: 32
    },
    label: {
        fontWeight: "bold",
        color: Colors.primary500
    },
    labelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    labelCount: {
        color: Colors.primary500
    },
    input: {
        marginTop: 8,
        marginBottom: 30,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    },
    inputHalfContainer: {
        flexDirection: "row"
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "top"
    },
    inputHalf: {
        flex: 1
    },
    inputText: {
        fontSize: 16,
        textTransform: "capitalize"
    },
    marginLeft: {
        marginLeft: 4
    },
    marginRight: {
        marginRight: 4
    },
    buttonContainer: {
        flexDirection: "row",
    },
    button: {
        flex: 1
    },
    imageContainer: {
        maxWidth: "100%",
        maxHeight: 300,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Platform.OS === "android" ? 16 : 32,
        marginBottom: Platform.OS === "android" ? 8 : 16,
        paddingHorizontal: 24
    },
    image: {
        width: "100%",
        height: "100%"
    },
    errorText: {
        textAlign: "center",
        color: Colors.error500,
        marginTop: 8,
        marginHorizontal: 8,
        marginBottom: 16,
        fontSize: 18
    },
    invalidLabel: {
        color: Colors.error500
    },
    invalidInput: {
        backgroundColor: Colors.error50,
        borderBottomColor: Colors.error500
    }
});