import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../components/atoms/Button';
import { logout } from '../../store/auth/authSlice';
import { useAppDispatch } from '../../store/hooks';

export const ProfileScreen = () => {
    const dispatch = useAppDispatch();

    const { t } = useTranslation();
    const style = styles();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('refreshToken');
        dispatch(logout());
    };

    return (
        <SafeAreaView style={style.container}>
            <Button styles={style.logout} onPress={handleLogout} text={t('profile.logout')} />
        </SafeAreaView>
    );
};

const styles = () =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end'
        },
        logout: {
            width: 160,
            marginBottom: 16
        }
    });
