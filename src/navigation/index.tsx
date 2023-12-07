import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabs } from './BottomTabs';
import { LoginScreen } from '../screens/Login/LoginScreen';
import { RegisterScreen } from '../screens/Register/RegisterScreen';
import { useLazyGetUserQuery, useRefreshTokenMutation } from '../store/auth/authApi';
import { setRefreshToken } from '../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export type RootStackParamList = {
    BottomTabs: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
    const { refreshToken } = useAppSelector(state => state.auth);
    const [refreshAccessToken, { isError: isRefreshAccessTokenError }] = useRefreshTokenMutation();
    const [getUser, getUserResult] = useLazyGetUserQuery();
    const { isError: isGetMeError } = getUserResult;
    const dispatch = useAppDispatch();

    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (!refreshToken) {
            setAuthorized(false);
            return;
        }
        setAuthorized(true);
    }, [refreshToken]);

    const handleCheckAuth = async () => {
        const localDeviceToken = await AsyncStorage.getItem('refreshToken');
        if (localDeviceToken) {
            try {
                await refreshAccessToken({ refreshToken: localDeviceToken }).unwrap();
                if (!isRefreshAccessTokenError) {
                    await getUser();
                    if (!isGetMeError) {
                        dispatch(setRefreshToken(localDeviceToken));
                        setAuthorized(true);
                    }
                    dispatch(setRefreshToken(localDeviceToken));
                    setAuthorized(true);
                }
            } catch (error) {
                return;
            }
        } else {
            return;
        }
    };

    return (
        <NavigationContainer onReady={handleCheckAuth}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName='LoginScreen'
            >
                {authorized && (
                    <Stack.Group>
                        <Stack.Screen name='BottomTabs' component={BottomTabs} />
                    </Stack.Group>
                )}
                {!authorized && (
                    <Stack.Group>
                        <Stack.Screen name='LoginScreen' component={LoginScreen} />
                        <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
