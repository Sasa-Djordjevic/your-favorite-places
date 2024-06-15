import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/colors'; 
import { ThemeContxt } from '../store/theme-context';

import AppPlacesOverview from './AppPlacesOverview';
import PlaceCategory from '../screens/PlaceCategory';
import PlaceDetails from '../screens/PlaceDetails';
import EditPlace from '../screens/EditPlace';
import SharePlaceScreen from '../screens/SharePlaceScreen';
import Settings from '../screens/Settings';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    const themeCtx = useContext(ThemeContxt);
    const themeMode = themeCtx.theme;

    return (
        <>
            <StatusBar style={themeMode} />
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName='PlacesOverview'
                    screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primary500
                    },
                    headerTintColor: Colors[themeMode].gray700,
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                    contentStyle: {
                        backgroundColor: Colors[themeMode].gray700,
                    },
                    //animation:'slide_from_right'
                    animation:'slide_from_bottom'
                    }}
                >
                    <Stack.Screen 
                    name='PlacesOverview' 
                    component={AppPlacesOverview} 
                    options={{
                        headerShown: false
                    }}
                    />
                    <Stack.Screen 
                    name='PlaceCategory'
                    component={PlaceCategory}
                    />
                    <Stack.Screen 
                    name='Settings' 
                    component={Settings}
                    />
                    <Stack.Screen 
                    name='PlaceDetails' 
                    component={PlaceDetails} 
                    options={{
                        title: 'Place Details'
                    }}
                    />
                    <Stack.Screen 
                    name='SharePlaceScreen'
                    component={SharePlaceScreen}
                    options={{
                        title: 'Share Place Details'
                    }}
                    />
                    <Stack.Screen 
                    name='EditPlace' 
                    component={EditPlace} 
                    options={{
                        title: 'Edit the Place'
                    }}
                    />
                </Stack.Navigator>
            </NavigationContainer>  
        </>
    );
}

export default AppNavigation;