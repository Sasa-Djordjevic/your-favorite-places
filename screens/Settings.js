import { useState, useLayoutEffect, useCallback, useContext } from "react";
import { View, Text, Switch, ScrollView, StyleSheet, Alert, Linking, Platform } from "react-native";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { appURL } from "../assets/URL/appURL";
import { ThemeContxt } from "../store/theme-context";

import IconButtonNS from "../components/UI/IconButtonNS";
import OutlineButton from "../components/UI/OutlinedButton";

let url1 = appURL.appIOSRateTheApp;
let url2 = appURL.appIOSExploreOurApps;
let url3 = appURL.appIOSPrivacyPolicy;
const url4 = appURL.appIOSTermsOfUse;

if (Platform.OS === "android") {
    url1 = appURL.appAndroidRateTheApp;
    url2 = appURL.appAndroidExploreOurApps;
    url3 = appURL.appAndroidPrivacyPolicy;
}

function Settings({navigation}) {
    const themeCtx = useContext(ThemeContxt);
    const themeMode = themeCtx.theme;

    const darkModeOn = themeMode === "dark" ? true : false;
    
    function goBackHandler() {
        navigation.goBack();
    }

    function darkModeToggler() {
        themeCtx.toggleTheme();
    }

    const urlButtonHandler = useCallback(async (url) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);
    
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(url);
        } else {
          //Alert.alert(`Don't know how to open this URL: ${url}`);
          Alert.alert("Sorry, something went wrong", "The application is unable to open this URL.");
        }
      }, [this.url]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <IconButtonNS
                  icon="arrow-down-circle-outline"
                  size={32}
                  color={Colors[themeMode].gray700}
                  onPress={goBackHandler}
                />
              )
        });
    }, [goBackHandler, navigation]);

    const iconOFF = <Ionicons name="close-circle-outline" size={24} color={Colors[themeMode].gray700}/>

    const iconON = <Ionicons name="checkmark-circle-outline" size={24} color={Colors.primary700}/>

    return (
        <View style={styles.screenContainer}>
            <ScrollView 
                style={styles.screenScrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.screenView}>
                    <View style={styles.modeContainer}>
                        <Text style={styles.title}>Theme Switch</Text>
                        <View style={styles.switchElement}>
                            <Text style={[styles.switchText, {color: Colors[themeMode].gray700}]}>Dark Mode</Text>
                            <Switch 
                                value={darkModeOn} 
                                onValueChange={darkModeToggler} 
                                trackColor={{false: Colors.primary100, true: Colors.primary500}} 
                                thumbColor={Colors.primary700}
                            />
                        </View>
                        <Text style={styles.title}>Theme Settings</Text>
                        <View style={styles.settingsElement}>
                            <View style={styles.settingsElementInner}>
                                <Ionicons name="moon-outline" size={20} color={Colors[themeMode].gray700}/>
                                <Text style={[styles.settingsText, {color: Colors[themeMode].gray700}]}>Dark</Text>
                            </View>
                            {darkModeOn ? iconON : iconOFF}
                        </View>
                        <View style={styles.settingsElement}>
                            <View style={styles.settingsElementInner}>
                                <Ionicons name="sunny-outline" size={20} color={Colors[themeMode].gray700}/>
                                <Text style={[styles.settingsText, {color: Colors[themeMode].gray700}]}>Light</Text>
                            </View>
                            {!darkModeOn ? iconON : iconOFF}
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <OutlineButton
                            onPress={urlButtonHandler.bind(this, url1)}
                            icon="star-outline"
                            color={Colors.primary500}
                            styleCustom={styles.button}
                        >Rate the App</OutlineButton>
                        <OutlineButton
                            onPress={urlButtonHandler.bind(this, url2)}
                            icon="apps-outline"
                            color={Colors.primary500}
                            styleCustom={styles.button}
                        >Explore Our Apps</OutlineButton>
                        <OutlineButton
                            onPress={urlButtonHandler.bind(this, url3)}
                            icon="document-text-outline"
                            color={Colors.primary500}
                            styleCustom={styles.button}
                        >Privacy Policy</OutlineButton>
                        {Platform.OS === "ios" && (
                        <OutlineButton
                            onPress={urlButtonHandler.bind(this, url4)}
                            icon="documents-outline"
                            color={Colors.primary500}
                            styleCustom={styles.button}
                        >Terms of Use</OutlineButton>  
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Settings;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: "center"
    },
    screenScrollView: {
        width: "100%",
        maxWidth: 500
    },
    screenView: {
        flex: 1,
        alignItems: "center",
        marginTop: 40,
        marginBottom: 40
    },
    title: {
        color: Colors.primary700,
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8
    },
    text: {
        color: "white"
    },
    buttonContainer: {
        width:  "80%"
    },
    modeContainer: {
        width: "80%",
        backgroundColor: Colors.primary400,
        paddingTop: 24,
        paddingHorizontal: 16,
        paddingBottom: 16,
        marginBottom: 40,
        marginHorizontal: 4,
        borderRadius: 8
    },
    switchText: {
        fontSize: 16,
    },
    switchElement: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.primary200,
        marginBottom: 16,
        paddingVertical: Platform.OS === "android" ? 0 : 8,
        paddingLeft: 24,
        paddingRight: 8,
        borderRadius: 30
    },
    settingsElement: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.primary200,
        marginBottom: 16,
        paddingVertical: 8,
        paddingLeft: 24,
        paddingRight: 16,
        borderRadius: 30
    },
    settingsElementInner: {
        flexDirection: "row",
        alignItems: "center"
    },
    settingsText: {
        fontSize: 16,
        marginLeft: 4
    },
    button: {
        marginBottom: 20
    }
});