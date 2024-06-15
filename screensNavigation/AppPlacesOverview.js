import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '../components/UI/IconButton';
import { Colors } from '../constants/colors';
import { ThemeContxt } from '../store/theme-context';

import AllPlaces from '../screens/AllPlaces';
import AddPlace from '../screens/AddPlace';

const BottomTab = createBottomTabNavigator();

function AppPlacesOverview({navigation}) {
    const themeCtx = useContext(ThemeContxt);
    const themeMode = themeCtx.theme;

    return (
            <BottomTab.Navigator
                sceneContainerStyle={{
                    backgroundColor: Colors[themeMode].gray700
                }}
                screenOptions={{
                    headerStyle: {
                    backgroundColor: Colors.primary500,
                    shadowOpacity: 0,
                    elevation: 0,   
                    },
                    headerTintColor: Colors[themeMode].gray700,
                    tabBarStyle: {
                    backgroundColor: Colors.primary500,
                    borderTopWidth: 0
                    //paddingBottom: 4
                    },
                    tabBarInactiveTintColor: Colors[themeMode].gray700,
                    tabBarActiveTintColor: Colors.primary600,
                    headerRight: ({tintColor}) => (
                        <IconButton 
                        icon="settings-outline"
                        size={30}
                        color={tintColor}
                        onPress={() => navigation.navigate("Settings")}
                        />
                    )
                }}
            >
                <BottomTab.Screen 
                    name='AllPlaces' 
                    component={AllPlaces} 
                    options={{
                    title: "Place Categories",
                    tabBarLabel: "Place Categories",
                    backgroundColor: Colors[themeMode].gray700,
                    tabBarIcon: ({color, size}) => <Ionicons name='list' color={color} size={size} />
                    }}
                />
                <BottomTab.Screen 
                    name='AddPlaces' 
                    component={AddPlace} 
                    options={{
                    title: "Add a New Place",
                    tabBarLabel: "Add a New Place",
                    tabBarIcon: ({color, size}) => <Ionicons name='add' color={color} size={size} />
                    }}
                />
            </BottomTab.Navigator>
    );
}

export default AppPlacesOverview;