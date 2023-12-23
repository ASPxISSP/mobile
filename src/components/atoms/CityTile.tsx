import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CitiesScreenParamList } from '../../navigation/BottomTabs';
import { City } from '../../utils/cities';

interface CityTileProps {
    city: City;
}

export const CityTile = ({ city }: CityTileProps) => {
    const { colors } = useTheme();
    const style = styles(city.available, colors);
    const { navigate } = useNavigation<NativeStackNavigationProp<CitiesScreenParamList>>();

    return (
        <View style={style.container}>
            <Text variant='titleMedium' style={style.text}>
                {`#${city.name}`}
            </Text>
            <TouchableOpacity
                disabled={!city.available}
                style={style.touchable}
                onPress={() => navigate('CityScreen', { city })}
            >
                <View style={style.imageContainer}>{city.image}</View>
            </TouchableOpacity>
        </View>
    );
};

const styles = (available: boolean, colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            marginVertical: 16
        },
        text: {
            marginHorizontal: 16,
            marginBottom: 16,
            color: colors.secondary
        },
        touchable: {
            width: '100%',
            borderRadius: 24,
            overflow: 'hidden'
        },
        imageContainer: {
            flex: 1,
            opacity: available ? 1 : 0.4
        }
    });
