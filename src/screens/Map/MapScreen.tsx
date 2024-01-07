import { Image, Platform, StyleSheet, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image as ImageSvg, Svg } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/atoms/Button';
import { CitiesScreenParamList } from '../../navigation/BottomTabs';
import { useGetPuzzlesQuery } from '../../store/puzzles/puzzlesApi';
import { INITIAL_REGION } from '../../utils/initialRegion';

export const MapScreen = () => {
    const { refetch, data, isLoading, isError } = useGetPuzzlesQuery();
    const { colors } = useTheme();
    const { navigate } = useNavigation<NativeStackNavigationProp<CitiesScreenParamList>>();

    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const style = styles(colors);

    return (
        <SafeAreaView edges={['left', 'right']}>
            <View style={style.container}>
                {isError && (
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 16,
                            alignSelf: 'center',
                            zIndex: 10
                        }}
                    >
                        <Button onPress={refetch} isLoading={isLoading} text='Refetch' />
                    </View>
                )}
                <MapView
                    provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                    initialRegion={INITIAL_REGION}
                    mapType={Platform.OS === 'android' ? 'terrain' : 'mutedStandard'}
                    style={StyleSheet.absoluteFill}
                >
                    {data?.map(item => (
                        <Marker key={item.id} coordinate={{ latitude: item.latitude, longitude: item.longitude }}>
                            <View
                                style={{
                                    ...style.pin,
                                    backgroundColor:
                                        item?.difficulty === 'EASY'
                                            ? hexToRgba(colors.surface, 0.5)
                                            : item?.difficulty === 'MEDIUM'
                                              ? hexToRgba(colors.primary, 0.5)
                                              : hexToRgba(colors.error, 0.5)
                                }}
                            >
                                <View
                                    style={{
                                        ...style.smallPin,
                                        backgroundColor:
                                            item.difficulty === 'EASY'
                                                ? colors.surface
                                                : item.difficulty === 'MEDIUM'
                                                  ? colors.primary
                                                  : colors.error
                                    }}
                                />
                            </View>
                            <Callout tooltip onPress={() => navigate('PuzzleScreen', { id: item.id, isSolved: true })}>
                                <View style={style.calloutContainer}>
                                    <View style={style.imageContainer}>
                                        {Platform.OS === 'android' ? (
                                            <Svg width={128} height={128}>
                                                <ImageSvg
                                                    width={'100%'}
                                                    height={'100%'}
                                                    preserveAspectRatio='xMidYMid slice'
                                                    href={{ uri: item.imageUri }}
                                                />
                                            </Svg>
                                        ) : (
                                            <Image
                                                source={{ uri: item.imageUri }}
                                                resizeMode='center'
                                                style={style.imageContainer}
                                            />
                                        )}
                                    </View>
                                    <View style={style.detailsContainer}>
                                        <Text variant='bodyLarge' style={{ textDecorationLine: 'underline' }}>
                                            Details
                                        </Text>
                                    </View>
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            </View>
        </SafeAreaView>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            width: '100%',
            height: '100%'
        },
        map: {
            width: '100%',
            height: '100%'
        },
        pin: {
            width: 24,
            height: 24,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center'
        },
        smallPin: {
            width: 12,
            height: 12,
            borderRadius: 6
        },
        calloutContainer: {
            width: 128,
            borderRadius: 16,
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.backdrop
        },
        imageContainer: {
            width: 128,
            height: 128
        },
        detailsContainer: {
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 4
        }
    });
