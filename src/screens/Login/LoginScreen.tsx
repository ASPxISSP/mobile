import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { LoginForm } from '../../components/organism/LoginForm';
import { ScrollScreen } from '../../components/templates/ScrollScreen';
import React from 'react';

export const LoginScreen = () => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <ScrollScreen>
            <View style={style.imageContainer}>
                <Image style={style.image} source={require('../../assets/images/logo.png')} />
            </View>
            <Text variant='titleMedium' style={style.title}>
                {t('login.title')}
            </Text>
            <LoginForm />
        </ScrollScreen>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        imageContainer: {
            marginTop: 16,
            paddingEnd: 32,
            alignItems: 'center',
            justifyContent: 'center'
        },
        image: {
            width: 196,
            height: 196
        },
        title: {
            color: colors.primary,
            marginHorizontal: 32,
            textAlign: 'center'
        }
    });
