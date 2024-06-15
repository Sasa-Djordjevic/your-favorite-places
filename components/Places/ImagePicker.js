import { View, Image, Text, Alert, StyleSheet } from "react-native";
import { launchCameraAsync, launchImageLibraryAsync, useCameraPermissions, useMediaLibraryPermissions, PermissionStatus } from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

import { Colors } from "../../constants/colors";

import OutlineButton from "../UI/OutlinedButton";

function ImagePicker({onTakeImage, pickedImage, imageIsValid}) {
    const [cameraPermissionInformation, requestPremission] = useCameraPermissions();
    const [galleryPermissionInformation, requestPremissionGallery] = useMediaLibraryPermissions();
    const [mediaLibraryPermissionInformation, requestPremissionMediaLibrary] = MediaLibrary.usePermissions();

    async function verifyPremission() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED ||
            cameraPermissionInformation.status === PermissionStatus.DENIED
        ) {
            const premissionResponse = await requestPremission();

            return premissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permissions!", "You need to grant camera permissions to use this app. Please change this in settings.");

            return false;
        }

        return true;
    }

    async function verifyPremissionMediaLibrary() {
        if (mediaLibraryPermissionInformation.status === PermissionStatus.UNDETERMINED ||
            mediaLibraryPermissionInformation.status === PermissionStatus.DENIED
        ) {
            const premissionResponse = await requestPremissionMediaLibrary();

            return premissionResponse.granted;
        }

        if (mediaLibraryPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permissions!", "You need to grant media library permissions to use this app. Please change this in settings.");

            return false;
        }

        return true;
    }

    async function verifyPremissionGallery() {
        if (galleryPermissionInformation.status === PermissionStatus.UNDETERMINED ||
            galleryPermissionInformation.status === PermissionStatus.DENIED
        ) {
            const premissionResponseGallery = await requestPremissionGallery();

            return premissionResponseGallery.granted;
        }

        if (galleryPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Insufficient Permissions!", "You need to grant gallery permissions to use this app. Please change this in settings.");

            return false;
        }

        return true;
    }

    // Checks if image directory exists. If not, creates it
    const imageDir = FileSystem.documentDirectory + 'placesimages/';

    async function ensureDirExists() {

        const dirInfo = await FileSystem.getInfoAsync(imageDir);

        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(imageDir, { intermediates: true });
        }
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPremission();
        const hasPermissionMediaLibrary = await verifyPremissionMediaLibrary()

        if (!hasPermission || !hasPermissionMediaLibrary) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7
        });

        if (image.canceled === false) {

            await MediaLibrary.saveToLibraryAsync(image.assets[0].uri);

            await ensureDirExists();

            const imageFileName = new Date().getTime() + ".jpg";
            const imageFromDest = image.assets[0].uri
            const imageDest = imageDir + imageFileName;

            await FileSystem.copyAsync({from: imageFromDest, to: imageDest});

            await FileSystem.deleteAsync(imageFromDest, { idempotent: true });

            const imageInfo = await FileSystem.getInfoAsync(imageDest);

            console.log(imageInfo.exists);
            console.log(imageDest);

            if (imageInfo.exists) {
                onTakeImage(imageDest)
            }
        }
    };

    async function takeImageGalleryHandler() {
        const hasPermission = await verifyPremissionGallery();

        if (!hasPermission) {
            return;
        }

        const image = await launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7
        });

        if (image.canceled === false) {
            
            await ensureDirExists();

            const imageFileName = new Date().getTime() + ".jpg";
            const imageFromDest = image.assets[0].uri
            const imageDest = imageDir + imageFileName;

            await FileSystem.copyAsync({from: imageFromDest, to: imageDest});

            await FileSystem.deleteAsync(imageFromDest, { idempotent: true });

            const imageInfo = await FileSystem.getInfoAsync(imageDest);

            console.log(imageInfo.exists);
            console.log(imageDest);

            if (imageInfo.exists) {
                onTakeImage(imageDest)
            }
        }
    };

    let imagePreview = <Text>No image taken yet.</Text>;

    if (pickedImage) {
        imagePreview = <Image source={{uri: pickedImage}} style={styles.image} />;
    }

    return (
        <View>
            <View style={[styles.imagePreview, !imageIsValid && styles.imageError]}>
                {imagePreview}
            </View>
            <View style={styles.buttonContainer}>
                <OutlineButton 
                    onPress={takeImageGalleryHandler}
                    icon="images"
                    color={Colors.primary500} 
                    styleCustom={styles.button}
                >Gallery</OutlineButton>
                <OutlineButton 
                    onPress={takeImageHandler}
                    icon="camera"
                    color={Colors.primary500} 
                    styleCustom={styles.button}
                >Camera</OutlineButton>
            </View>
        </View>
    );
};

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginBottom: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: "100%",
        height: "100%"
    },
    imageError: {
        backgroundColor: Colors.error50
    },
    buttonContainer: {
        flexDirection: "row",
        marginBottom: 24
    },
    button: {
        flex: 1
    }
});