import { useTranslation } from 'react-i18next';
import { Linking, SafeAreaView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Button } from '../../components/atoms/Button';
import { Permission } from '../../components/molecules/Permission';

export const PermissionsScreen = () => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <SafeAreaView style={style.screen}>
            <View style={{ flex: 1 }}>
                <Text variant='titleLarge' style={style.title}>
                    {t('permissions.noPermissions')}
                </Text>
                <Text variant='bodyLarge' style={style.reason}>
                    {t('permissions.reason')}
                </Text>
                <Permission
                    description={t('permissions.locationDescription')}
                    icon={<Fontisto name='map' color={colors.secondary} size={36} />}
                    title={t('permissions.location')}
                />
            </View>
            <Button
                text={t('permissions.openSettings')}
                onPress={() => Linking.openSettings()}
                styles={style.settings}
            />
        </SafeAreaView>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        screen: {
            flex: 1,
            backgroundColor: colors.background
        },
        title: {
            textAlign: 'center',
            color: colors.secondary,
            marginVertical: 32,
            fontWeight: 'bold'
        },
        reason: {
            marginHorizontal: 32,
            marginBottom: 48,
            color: colors.secondary
        },
        settings: {
            alignSelf: 'center',
            width: '50%',
            backgroundColor: colors.primary,
            marginBottom: 32
        }
    });
