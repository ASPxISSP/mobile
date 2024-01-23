import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { RegisterForm } from '../../components/organism/RegisterForm';
import { ScrollScreen } from '../../components/templates/ScrollScreen';
import React from 'react';

export const RegisterScreen = () => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <ScrollScreen>
            <View style={style.header}>
                <Text variant='titleMedium' style={style.title}>
                    {t('register.title')}
                </Text>
                <Image style={style.image} source={require('../../assets/images/logo.png')} />
            </View>
            <RegisterForm />
        </ScrollScreen>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        header: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end'
        },
        image: {
            width: 96,
            height: 96
        },
        title: {
            color: colors.primary,
            marginHorizontal: 32,
            textAlign: 'center'
        }
    });
