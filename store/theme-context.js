import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import {Appearance} from 'react-native';

export const ThemeContxt = createContext({
    theme: "",
    toggleTheme: () => {}
});

function ThemeContextProvider({children}) {
    // const colorScheme = Appearance.getColorScheme();
    // console.log(colorScheme);

    const [theme, setTheme] = useState("dark");

    const toggleTheme = async () => {

        if (theme === "dark") {
            setTheme("light");

            await AsyncStorage.setItem("themeLocalStorage", "light");
        } else {
            setTheme("dark");

            await AsyncStorage.setItem("themeLocalStorage", "dark");
        }
    };

    const value = {
        theme: theme,
        toggleTheme: toggleTheme
    }

    return (
        <ThemeContxt.Provider value={value}>
            {children}
        </ThemeContxt.Provider>
    );
}

export default ThemeContextProvider;