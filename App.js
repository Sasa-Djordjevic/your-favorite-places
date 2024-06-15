import { useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { init } from './util/database';
import * as SplashScreen from 'expo-splash-screen';
import ThemeContextProvider from './store/theme-context';
import { ThemeContxt } from './store/theme-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppNavigation from './screensNavigation/AppNavigation';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function RootNavigation() {
  const [dbInitialized, setDbInitialized] = useState(true);

  const themeCtx = useContext(ThemeContxt);

  useEffect(() => {
    init()
    .then(() => {
        const themeLocalStorage = AsyncStorage.getItem('themeLocalStorage');

        return themeLocalStorage
    })
    .then((themeLocalStorageData) => {
        if (themeLocalStorageData === "light") {
            themeCtx.toggleTheme();
        }
    })
    .then(() => {
        setDbInitialized(false);

        // hide the splash screen after the app is ready + 1s
        setTimeout(() => SplashScreen.hideAsync(), 1000);
      
    })
    .catch((err) => {
        Alert.alert("Something went wrong", `Please try again. Error: ${err}`);
    });

  }, []);

  if (dbInitialized) {
    return null;
  }

  return <AppNavigation />;
}

export default function App() {

  return (
    <>
      <ThemeContextProvider>
        <RootNavigation />
      </ThemeContextProvider>
    </>
  );
}

