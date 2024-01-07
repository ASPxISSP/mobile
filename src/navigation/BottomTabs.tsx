import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CitiesListScreen } from '../screens/CitiesList/CitiesListScreen';
import { CityScreen } from '../screens/City/CityScreen';
import { MapScreen } from '../screens/Map/MapScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { PuzzleScreen } from '../screens/Puzzle/PuzzleScreen';
import { City } from '../utils/cities';

export type BottomTabsParamList = {
    CitiesScreen: undefined;
    MapScreen: NavigatorScreenParams<CitiesScreenParamList>;
    ProfileScreen: undefined;
};

export type CitiesScreenParamList = {
    CitiesListScreen: undefined;
    CityScreen: { city: City };
    PuzzleScreen: {
        id: number;
        isSolved: boolean;
    };
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();
const CitiesStack = createNativeStackNavigator<CitiesScreenParamList>();

const Cities = () => {
    return (
        <CitiesStack.Navigator
            screenOptions={{
                headerTransparent: true,
                headerShown: false
            }}
        >
            <CitiesStack.Screen name='CitiesListScreen' component={CitiesListScreen} />
            <CitiesStack.Screen name='CityScreen' component={CityScreen} />
            <CitiesStack.Screen name='PuzzleScreen' component={PuzzleScreen} />
        </CitiesStack.Navigator>
    );
};

export const BottomTabs = () => {
    const { colors } = useTheme();
    const { t } = useTranslation();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: colors.scrim },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.backdrop,
                headerTransparent: true,
                tabBarHideOnKeyboard: true,
                headerShown: false
            }}
        >
            <Tab.Screen
                name='CitiesScreen'
                component={Cities}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='city-variant-outline' color={color} size={size} />
                    ),
                    title: t('navigation.cities')
                }}
            />
            <Tab.Screen
                name='MapScreen'
                component={MapScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='map-outline' color={color} size={size} />,
                    title: t('navigation.map')
                }}
            />
            <Tab.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Feather name='user' color={color} size={size} />,
                    title: t('navigation.profile')
                }}
            />
        </Tab.Navigator>
    );
};
