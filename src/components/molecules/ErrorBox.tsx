import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { Button } from '../atoms/Button';

interface ErrorBoxProps {
    buttonText: string;
    isLoading: boolean;
    message: string;
    onPress: () => void;
}

export const ErrorBox = ({ buttonText, isLoading, message, onPress }: ErrorBoxProps) => {
    const { t } = useTranslation();
    const { colors } = useTheme();

    const style = styles(colors);

    return (
        <View style={style.container}>
            <Text variant='labelLarge' style={style.title}>
                {t('error.error')}
            </Text>
            <View style={style.separator} />
            <Text variant='bodyLarge' style={style.message}>
                {message}
            </Text>
            <Button onPress={onPress} text={buttonText} isLoading={isLoading} styles={style.button} />
        </View>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            marginVertical: 16,
            alignItems: 'center'
        },
        title: {
            color: colors.secondary
        },
        separator: {
            width: 32,
            backgroundColor: colors.error,
            height: 4,
            borderRadius: 2
        },
        message: {
            color: colors.secondary,
            marginTop: 16
        },
        button: {
            minWidth: '50%',
            marginTop: 32
        }
    });
