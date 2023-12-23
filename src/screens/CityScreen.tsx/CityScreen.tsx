import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Linking, NativeScrollEvent, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { mocks } from './mocks';
import { ErrorBox } from '../../components/molecules/ErrorBox';
import { GridView } from '../../components/molecules/GridView';
import { ModalContext } from '../../context/ModalContext';
import { CitiesScreenParamList } from '../../navigation/BottomTabs';
import { useGetPuzzlesQuery } from '../../store/puzzles/puzzlesApi';
import { extractErrorMessage } from '../../utils/extractErrorMessage';

export const CityScreen = () => {
    const { colors } = useTheme();
    const { t } = useTranslation();
    const { top: topInset } = useSafeAreaInsets();
    const style = styles(colors, topInset);
    const { navigate, goBack } = useNavigation<NativeStackNavigationProp<CitiesScreenParamList>>();
    const {
        params: { city }
    } = useRoute<RouteProp<CitiesScreenParamList, 'CityScreen'>>();
    const { setModalDetails, toggleModalVisibility } = useContext(ModalContext);

    const [page, setPage] = useState(1);

    const { isLoading, refetch, data, error } = useGetPuzzlesQuery({ city: city.name, page });

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    const handleOpenURL = async () => {
        const supported = await Linking.canOpenURL(city.descriptionLink);

        if (!supported) {
            setModalDetails(t('cities.wrong_url'), t('error.error'));
            toggleModalVisibility();
            return;
        }

        await Linking.openURL(city.descriptionLink);
    };

    return (
        <SafeAreaView edges={{ top: 'off' }} style={style.container}>
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    const canUpdatePage =
                        isCloseToBottom(nativeEvent) && !isLoading && data && page < data.meta.total / data.meta.size;

                    if (canUpdatePage) {
                        setPage(state => state + 1);
                    }
                }}
                scrollEventThrottle={400}
            >
                <View style={style.mainContainer}>
                    <TouchableOpacity style={style.returnButton} onPress={goBack}>
                        <AntDesign name='arrowleft' color={colors.scrim} size={36} />
                    </TouchableOpacity>
                    <View style={style.cityImage}>{city.image}</View>
                    <View style={style.descriptionContainer}>
                        <View style={style.cityContainer}>
                            <Text variant='titleMedium'>{city.name}</Text>
                            <Image
                                source={require('../../assets/images/maps/map_wroclaw.png')}
                                style={style.mapImage}
                            />
                        </View>
                        <Text variant='bodyLarge' style={style.description}>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/* @ts-expect-error */}
                            {t(`cities.description.${city.descriptionKey}`)}
                        </Text>
                        <TouchableOpacity onPress={handleOpenURL} style={style.readMoreButton}>
                            <Text variant='bodyMedium' style={style.readMore}>
                                {t('cities.read_more')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style.listContainer}>
                    <Text variant='labelLarge'>{`${t('cities.progress')}: 1/20`}</Text>
                    <View style={style.dataList}>
                        {data && (
                            <GridView
                                data={mocks}
                                renderItem={item => (
                                    <TouchableOpacity
                                        style={{
                                            ...style.puzzle,
                                            borderColor: item.isUnlocked ? colors.surface : colors.primary
                                        }}
                                        disabled={!item.isUnlocked}
                                        onPress={() => navigate('PuzzleScreen', { id: item.id })}
                                    >
                                        {item.isUnlocked ? (
                                            <Image source={{ uri: item.imageUri }} style={style.puzzleImage} />
                                        ) : (
                                            <Octicons name='lock' size={24} color={colors.primary} />
                                        )}
                                    </TouchableOpacity>
                                )}
                                columns={2}
                            />
                        )}
                        {isLoading && <ActivityIndicator style={style.indicator} color={colors.primary} />}
                        {error && (
                            <ErrorBox
                                message={extractErrorMessage(error)}
                                buttonText={t('error.refetch')}
                                isLoading={isLoading}
                                onPress={refetch}
                            />
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = (colors: MD3Colors, topInset: number) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
        },
        mainContainer: {
            backgroundColor: colors.scrim
        },
        returnButton: {
            position: 'absolute',
            zIndex: 2,
            top: topInset > 0 ? topInset : 16,
            left: 16,
            backgroundColor: 'rgba(0,0,0,0.25)',
            borderRadius: 24,
            padding: 4,
            alignItems: 'center',
            justifyContent: 'center'
        },
        cityImage: {
            top: -24
        },
        descriptionContainer: {
            marginBottom: 32,
            paddingHorizontal: 32
        },
        cityContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
        },
        mapImage: {
            width: 96,
            height: 96
        },
        description: {
            marginTop: 16,
            color: colors.secondary
        },
        readMoreButton: {
            alignItems: 'center',
            width: 64,
            alignSelf: 'center'
        },
        readMore: {
            marginTop: 16,
            textAlign: 'center',
            textDecorationLine: 'underline'
        },
        listContainer: {
            padding: 32
        },
        dataList: {
            marginVertical: 16,
            alignItems: 'center'
        },
        puzzle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 128,
            borderRadius: 16,
            margin: 8,
            overflow: 'hidden',
            borderWidth: 2
        },
        puzzleImage: {
            width: '80%',
            height: '80%',
            resizeMode: 'contain'
        },
        indicator: {
            marginVertical: 16
        }
    });
