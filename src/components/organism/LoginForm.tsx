import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ModalContext } from '../../context/ModalContext';
import { RootStackParamList } from '../../navigation';
import { LoginSchema, loginSchema } from '../../schemas/authSchema';
import { useLazyGetUserQuery, useLoginMutation } from '../../store/auth/authApi';
import { extractErrorMessage } from '../../utils/extractErrorMessage';
import { Button } from '../atoms/Button';
import { FormInput } from '../molecules/FormInput';

export const LoginForm = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [login, { isError: isLoginError, isLoading: isLoginLoading, error: loginError }] = useLoginMutation();
    const [getUser, getUserResult] = useLazyGetUserQuery();
    const { isError: isGetUserError, isLoading: isGetUserLoading, error: getUserError } = getUserResult;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<LoginSchema>({ defaultValues: { email: '', password: '' }, resolver: zodResolver(loginSchema) });

    const { setModalDetails, toggleModalVisibility } = useContext(ModalContext);

    const { colors } = useTheme();
    const { t } = useTranslation();
    const style = styles(colors);

    useEffect(() => {
        if (isLoginError || isGetUserError) {
            toggleModalVisibility();
            if (loginError) {
                setModalDetails(extractErrorMessage(loginError), t('error.error'));
                return;
            }
            if (getUserError) {
                setModalDetails(extractErrorMessage(getUserError), t('error.error'));
                return;
            }
        }
    }, [isLoginError, isGetUserError, loginError, getUserError]);

    const onSubmit = handleSubmit(async data => {
        try {
            const { refreshToken } = await login(data).unwrap();
            await getUser().unwrap();
            await AsyncStorage.setItem('refreshToken', refreshToken);
        } catch (error) {
            return;
        }
    });

    const onSignUpPress = () => {
        navigation.navigate('RegisterScreen');
        setTimeout(() => reset(), 1000);
    };

    return (
        <View style={style.form}>
            <FormInput
                controler={control}
                label={t('login.email')}
                name='email'
                autoCapitalize='none'
                errorMessage={errors.email?.message}
                isError={errors.email}
            />
            <FormInput
                controler={control}
                label={t('login.password')}
                name='password'
                autoCapitalize='none'
                password
                errorMessage={errors.password?.message}
                isError={errors.password}
            />
            <View style={style.loginButtonContainer}>
                <Button
                    isLoading={isLoginLoading || isGetUserLoading}
                    onPress={onSubmit}
                    title={t('login.button')}
                    styles={style.loginButton}
                />
            </View>
            <View style={style.registerContainer}>
                <Text variant='bodyLarge'>{t('login.no_account')}</Text>
                <TouchableOpacity onPress={onSignUpPress} style={style.signUpButton}>
                    <Text variant='bodyLarge' style={style.signUpButtonText}>
                        {t('login.sign_up')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        form: {
            flex: 1,
            marginVertical: 32,
            alignItems: 'center'
        },
        input: {
            width: '80%',
            marginBottom: 8
        },
        loginButtonContainer: {
            alignItems: 'center',
            marginTop: 32
        },
        loginButton: {
            minWidth: 128
        },
        registerContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 32,
            marginVertical: 16,
            flexDirection: 'row'
        },
        signUpButton: {
            marginStart: 4
        },
        signUpButtonText: {
            color: colors.primary
        }
    });
