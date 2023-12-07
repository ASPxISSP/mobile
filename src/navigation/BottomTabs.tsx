import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapScreen } from '../screens/Map/MapScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { PuzzlesListScreen } from '../screens/PuzzlesList/PuzzlesListScreen';

export type BottomTabsParamList = {
    PuzzlesScreen: undefined;
    MapScreen: undefined;
    ProfileScreen: undefined;
};

export type PuzzlesScreenParamList = {
    PuzzlesListScreen: undefined;
    PuzzleDetailsScreen: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();

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
                name='PuzzlesScreen'
                component={PuzzlesListScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='extension-puzzle-outline' color={color} size={size} />
                    ),
                    title: t('navigation.puzzle')
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
