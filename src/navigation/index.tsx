import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { check, PERMISSIONS, request } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabs } from './BottomTabs';
import { LoginScreen } from '../screens/Login/LoginScreen';
import { PermissionsScreen } from '../screens/Permissions/PermissionsScreen';
import { RegisterScreen } from '../screens/Register/RegisterScreen';
import { useLazyGetUserQuery, useRefreshTokenMutation } from '../store/auth/authApi';
import { setRefreshToken } from '../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export type RootStackParamList = {
    BottomTabs: undefined;
    LoginScreen: undefined;
    PermissionsScreen: undefined;
    RegisterScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
    const { refreshToken } = useAppSelector(state => state.auth);
    const [refreshAccessToken, { isError: isRefreshAccessTokenError }] = useRefreshTokenMutation();
    const [getUser, getUserResult] = useLazyGetUserQuery();
    const { isError: isGetMeError } = getUserResult;
    const dispatch = useAppDispatch();

    const [permissions, setPermissions] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('LoginScreen');

    useEffect(() => {
        if (!refreshToken) {
            setAuthorized(false);
            return;
        }
        setAuthorized(true);
    }, [refreshToken]);

    useEffect(() => {
        checkPermissions();
    }, [authorized]);

    const checkPermissions = async () => {
        if (Platform.OS === 'ios') {
            const isLocationWhenInUsePermission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

            if (isLocationWhenInUsePermission === 'granted') {
                handleLocationPermissions(true);
                return;
            } else if (isLocationWhenInUsePermission === 'denied') {
                handleLocationPermissions(true);
                const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
                if (response === 'granted') {
                    handleLocationPermissions(true);
                    return;
                }
            }

            handleLocationPermissions(false);
        }
        if (Platform.OS === 'android') {
            const isLocationPermission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

            if (isLocationPermission === 'granted') {
                handleLocationPermissions(true);
                return;
            } else if (isLocationPermission === 'denied') {
                handleLocationPermissions(true);
                const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
                if (response === 'granted') {
                    handleLocationPermissions(true);
                    return;
                }
            }

            handleLocationPermissions(false);
        }
    };

    const handleLocationPermissions = (status: boolean) => {
        if (status) {
            setPermissions(true);
            if (authorized) {
                setInitialRoute('BottomTabs');
                return;
            }
            setInitialRoute('LoginScreen');
            return;
        }
        setPermissions(false);
        setInitialRoute('PermissionsScreen');
    };

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
                    setTimeout(async () => {
                        await RNBootSplash.hide({ fade: true });
                    }, 1000);
                }
            } catch (error) {
                setTimeout(async () => {
                    await RNBootSplash.hide({ fade: true });
                }, 1000);
            }
        } else {
            setTimeout(async () => {
                await RNBootSplash.hide({ fade: true });
            }, 1000);
        }
    };

    return (
        <NavigationContainer onReady={handleCheckAuth}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={initialRoute}
            >
                {!permissions && (
                    <Stack.Group>
                        <Stack.Screen name='PermissionsScreen' component={PermissionsScreen} />
                    </Stack.Group>
                )}
                {authorized && permissions && (
                    <Stack.Group>
                        <Stack.Screen name='BottomTabs' component={BottomTabs} />
                    </Stack.Group>
                )}
                {!authorized && permissions && (
                    <Stack.Group>
                        <Stack.Screen name='LoginScreen' component={LoginScreen} />
                        <Stack.Screen name='RegisterScreen' component={RegisterScreen} />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
