import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ModalContext } from '../../context/ModalContext';
import { RootStackParamList } from '../../navigation';
import { RegisterSchema, registerSchema } from '../../schemas/authSchema';
import { useRegisterMutation } from '../../store/auth/authApi';
import { extractErrorMessage } from '../../utils/extractErrorMessage';
import { Button } from '../atoms/Button';
import { FormInput } from '../molecules/FormInput';

export const RegisterForm = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [register, { isError, isLoading, isSuccess, error }] = useRegisterMutation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<RegisterSchema>({
        defaultValues: { email: '', name: '', password: '', passwordConfirm: '' },
        resolver: zodResolver(registerSchema)
    });

    const { setModalDetails, toggleModalVisibility } = useContext(ModalContext);

    const { colors } = useTheme();
    const { t } = useTranslation();
    const style = styles(colors);

    const onSubmit = handleSubmit(data => {
        try {
            register(data);
        } catch (error) {
            return;
        }
    });

    useEffect(() => {
        if (isSuccess) {
            setModalDetails(t('register.successMessage'), t('register.success'));
            toggleModalVisibility();
            navigation.navigate('LoginScreen');
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError && error) {
            toggleModalVisibility();
            setModalDetails(extractErrorMessage(error), t('error.error'));
        }
    }, [isError, error]);

    const onLoginPress = () => {
        navigation.navigate('LoginScreen');
        setTimeout(() => reset(), 1000);
    };

    return (
        <View style={style.form}>
            <FormInput
                controler={control}
                label={t('register.username')}
                name='name'
                errorMessage={errors.name?.message}
                isError={errors.name}
            />
            <FormInput
                controler={control}
                label={t('register.email')}
                name='email'
                autoCapitalize='none'
                errorMessage={errors.email?.message}
                isError={errors.email}
            />
            <FormInput
                controler={control}
                label={t('register.password')}
                name='password'
                autoCapitalize='none'
                password
                errorMessage={errors.password?.message}
                isError={errors.password}
            />
            <FormInput
                controler={control}
                label={t('register.password_confirmation')}
                name='passwordConfirm'
                autoCapitalize='none'
                password
                errorMessage={errors.passwordConfirm?.message}
                isError={errors.passwordConfirm}
            />
            <View style={style.registerButtonContainer}>
                <Button
                    isLoading={isLoading}
                    onPress={onSubmit}
                    title={t('register.button')}
                    styles={style.registerButton}
                />
            </View>
            <View style={style.loginContainer}>
                <Text variant='bodyLarge'>{t('register.account_exists')}</Text>
                <TouchableOpacity onPress={onLoginPress} style={style.loginButton}>
                    <Text variant='bodyLarge' style={style.loginButtonText}>
                        {t('register.log_in')}
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
        registerButtonContainer: {
            alignItems: 'center',
            marginTop: 32
        },
        registerButton: {
            minWidth: 128
        },
        loginContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 32,
            marginVertical: 16,
            flexDirection: 'row'
        },
        loginButton: {
            marginStart: 4
        },
        loginButtonText: {
            color: colors.primary
        }
    });
