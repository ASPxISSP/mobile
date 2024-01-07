import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { cities } from '../../utils/cities';
import { CityTile } from '../atoms/CityTile';

export const CitiesList = () => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <View style={style.container}>
            <Text variant='titleLarge' style={style.title}>
                {t('cities.title')}
            </Text>
            <View style={style.underline} />
            <View style={style.flatListContainer}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={cities}
                    renderItem={({ item }) => <CityTile key={item.name} city={item} />}
                    alwaysBounceVertical={false}
                />
            </View>
        </View>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 16
        },
        title: {
            color: colors.secondary,
            marginHorizontal: 16,
            marginTop: 32
        },
        underline: {
            width: 64,
            height: 4,
            backgroundColor: colors.primary,
            borderRadius: 2,
            marginBottom: 16,
            marginHorizontal: 16
        },
        flatListContainer: {
            flex: 1
        }
    });
