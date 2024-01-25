import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { zodResolver } from '@hookform/resolvers/zod';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../../components/atoms/Button';
import { ErrorBox } from '../../components/molecules/ErrorBox';
import { FormInput } from '../../components/molecules/FormInput';
import { ScrollScreen } from '../../components/templates/ScrollScreen';
import { ModalContext } from '../../context/ModalContext';
import { CitiesScreenParamList } from '../../navigation/BottomTabs';
import { SolutionSchema, solutionSchema } from '../../schemas/puzzleSchema';
import { useGetPuzzleQuery, useSolvePuzzleMutation } from '../../store/puzzles/puzzlesApi';
import { checkPointInRadius } from '../../utils/checkPointInRadius';
import { extractErrorMessage } from '../../utils/extractErrorMessage';

const INITIAL_REGION: Region = {
    latitude: 52.086553,
    latitudeDelta: 8,
    longitude: 19.1899343,
    longitudeDelta: 8
};

export const PuzzleScreen = () => {
    const { colors } = useTheme();
    const { t } = useTranslation();
    const {
        params: { id, isSolved }
    } = useRoute<RouteProp<CitiesScreenParamList, 'PuzzleScreen'>>();
    const { goBack } = useNavigation<NativeStackNavigationProp<CitiesScreenParamList>>();
    const { setModalDetails, toggleModalVisibility } = useContext(ModalContext);
    const { refetch, data, error, isLoading } = useGetPuzzleQuery({ id });
    const [solvePuzzle, { data: solveResponse, isLoading: isSolvePuzzleLoading, error: solvePuzzleError }] =
        useSolvePuzzleMutation();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<SolutionSchema>({
        defaultValues: {
            solution: ''
        },
        resolver: zodResolver(solutionSchema)
    });

    const [position, setPosition] = useState<Region>();
    const [isHintVisible, setIsHintVisible] = useState(false);
    const [isFormUnlocked, setIsFormUnlocked] = useState(false);

    useEffect(() => {
        const handleLocationChange = ({ coords }: GeolocationResponse) => {
            setPosition({
                latitude: coords.latitude,
                latitudeDelta: 0.005,
                longitude: coords.longitude,
                longitudeDelta: 0.005
            });
        };

        const locationOptions = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

        const locationWatcher = Geolocation.watchPosition(handleLocationChange, undefined, locationOptions);

        return () => Geolocation.clearWatch(locationWatcher);
    }, []);

    useEffect(() => {
        if (data && position) {
            const levelRadius = () => {
                switch (data.difficulty) {
                    case 'EASY':
                        return 0.004;
                    case 'MEDIUM':
                        return 0.003;
                    case 'HARD':
                        return 0.002;
                    default:
                        return 0;
                }
            };

            if (
                checkPointInRadius(position, {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    radius: levelRadius()
                })
            ) {
                setModalDetails(data.tip, t('puzzle.hint'));
                setIsHintVisible(true);
            }
            if (
                checkPointInRadius(position, {
                    latitude: data.latitude,
                    longitude: data.longitude,
                    radius: 0.001
                })
            ) {
                setIsFormUnlocked(true);
            }
        }
    }, [data, position]);

    useEffect(() => {
        if (solvePuzzleError) {
            toggleModalVisibility();
            setModalDetails(extractErrorMessage(solvePuzzleError), t('error.error'));
        }
    }, [solvePuzzleError]);

    const style = styles(colors);

    const onSubmit = handleSubmit(async data => {
        if (position) {
            try {
                await solvePuzzle({
                    id,
                    latitude: position.latitude,
                    longitude: position.longitude,
                    solution: data.solution
                }).unwrap();
                setModalDetails(t('puzzle.success_message', { points: solveResponse?.points }), t('puzzle.success'));
                toggleModalVisibility();
                goBack();
            } catch (error) {
                return;
            }
        }
    });

    const handleOpenHint = () => {
        toggleModalVisibility();
    };

    return (
        <ScrollScreen>
            <TouchableOpacity style={style.returnButton} onPress={goBack}>
                <AntDesign name='arrowleft' color={colors.secondary} size={36} />
            </TouchableOpacity>
            {(isLoading || error) && (
                <View style={style.statusContainer}>
                    {isLoading && <ActivityIndicator size='large' style={style.indicator} color={colors.primary} />}
                    {error && (
                        <ErrorBox
                            message={extractErrorMessage(error)}
                            buttonText={t('error.refetch')}
                            isLoading={isLoading}
                            onPress={refetch}
                        />
                    )}
                </View>
            )}
            {data && (
                <>
                    <View style={style.imageContainer}>
                        <Image
                            source={{
                                uri: data.imageUri
                            }}
                            style={style.image}
                        />
                    </View>
                    <View style={style.levelContainer}>
                        <Text variant='labelLarge' style={style.levelTitle}>
                            {t('puzzle.level')}
                        </Text>
                        <View style={style.difficultyContainer}>
                            <Text variant='labelSmall'>{data.difficulty}</Text>
                            <View
                                style={{
                                    marginTop: 4,
                                    width: 64,
                                    height: 4,
                                    borderRadius: 2,
                                    backgroundColor:
                                        data?.difficulty === 'EASY'
                                            ? colors.surface
                                            : data?.difficulty === 'MEDIUM'
                                              ? colors.primary
                                              : colors.error
                                }}
                            />
                        </View>
                        {isHintVisible && !isSolved && (
                            <TouchableOpacity style={style.hint} onPress={handleOpenHint}>
                                <Octicons name='question' color={colors.secondary} size={24} />
                            </TouchableOpacity>
                        )}
                    </View>
                    {isSolved ? (
                        <>
                            <View style={style.formContainer}>
                                <Text variant='labelLarge'>{t('puzzle.address')}</Text>
                                <Text style={{ marginVertical: 4 }}>{data.address}</Text>
                                <Text>{data.city}</Text>
                            </View>
                            <View style={style.formContainer}>
                                <Text variant='labelLarge'>{t('puzzle.solution')}</Text>
                                <Text style={{ marginTop: 4 }}>{data.solution}</Text>
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={style.formContainer}>
                                <Text variant='labelLarge'>{t('puzzle.solution')}</Text>
                                {isFormUnlocked ? (
                                    <>
                                        <FormInput
                                            style={{ width: 256, marginTop: 16 }}
                                            controler={control}
                                            label={t('puzzle.solution')}
                                            name='solution'
                                            errorMessage={errors.solution && extractErrorMessage(errors.solution)}
                                            isError={errors.solution}
                                        />
                                        <Button
                                            styles={{ marginTop: 16 }}
                                            isLoading={isSolvePuzzleLoading}
                                            onPress={onSubmit}
                                            text={t('puzzle.solve')}
                                        />
                                    </>
                                ) : (
                                    <Text variant='bodyLarge' style={style.find}>
                                        {t('puzzle.find_way')}
                                    </Text>
                                )}
                            </View>
                            <View style={style.mapContainer}>
                                <Text variant='labelLarge' style={{ textAlign: 'center' }}>
                                    {t('puzzle.map')}
                                </Text>
                                <View style={style.mapBox}>
                                    <MapView
                                        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
                                        showsUserLocation
                                        showsMyLocationButton
                                        followsUserLocation
                                        initialRegion={INITIAL_REGION}
                                        region={position}
                                        style={style.map}
                                    />
                                </View>
                            </View>
                        </>
                    )}
                </>
            )}
        </ScrollScreen>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
        },
        returnButton: {
            width: 44,
            margin: 16,
            alignItems: 'center',
            justifyContent: 'center'
        },
        statusContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        indicator: {
            marginVertical: 16
        },
        imageContainer: {
            width: 256,
            height: 256,
            borderRadius: 24,
            marginVertical: 16,
            alignSelf: 'center',
            overflow: 'hidden',
            backgroundColor: 'white'
        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'center'
        },
        levelContainer: {
            width: '100%',
            alignSelf: 'center',
            marginVertical: 16
        },
        levelTitle: {
            alignSelf: 'center'
        },
        difficultyContainer: {
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: 16
        },
        hint: {
            position: 'absolute',
            right: 24
        },
        formContainer: {
            alignSelf: 'center',
            alignItems: 'center',
            marginVertical: 16
        },
        find: {
            marginTop: 16,
            marginHorizontal: 32
        },
        mapContainer: {
            alignSelf: 'center',
            width: 320,
            marginTop: 16
        },
        mapBox: {
            overflow: 'hidden',
            marginVertical: 16,
            borderWidth: 2,
            borderColor: colors.secondary,
            borderRadius: 24
        },
        map: {
            width: '100%',
            height: 256
        }
    });
