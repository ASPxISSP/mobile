import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ErrorBox } from '../../components/molecules/ErrorBox';
import { FormInput } from '../../components/molecules/FormInput';
import { ModalContext } from '../../context/ModalContext';
import { CitiesScreenParamList } from '../../navigation/BottomTabs';
import { SolutionSchema, solutionSchema } from '../../schemas/puzzleSchema';
import { useGetPuzzleQuery, useSolvePuzzleMutation } from '../../store/puzzles/puzzlesApi';
import { extractErrorMessage } from '../../utils/extractErrorMessage';

export const PuzzleScreen = () => {
    const { colors } = useTheme();
    const { t } = useTranslation();
    const {
        params: { id }
    } = useRoute<RouteProp<CitiesScreenParamList, 'PuzzleScreen'>>();
    const { goBack } = useNavigation<NativeStackNavigationProp<CitiesScreenParamList>>();
    const { setModalDetails, toggleModalVisibility } = useContext(ModalContext);
    const { refetch, data, error, isLoading } = useGetPuzzleQuery({ id });
    const [solvePuzzle, { isLoading: isSolvePuzzleLoading, error: solvePuzzleError }] = useSolvePuzzleMutation();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<SolutionSchema>({ resolver: zodResolver(solutionSchema) });

    const style = styles(colors);

    const onSubmit = handleSubmit(async data => {
        try {
            await solvePuzzle({ id, latitude: 0, longitude: 0, solution: data.solution });
        } catch (error) {
            return;
        }
    });

    const handleOpenHint = () => {
        toggleModalVisibility();
    };

    return (
        <SafeAreaView style={style.container} edges={['left', 'right', 'top']}>
            <TouchableOpacity style={style.returnButton} onPress={goBack}>
                <AntDesign name='arrowleft' color={colors.secondary} size={36} />
            </TouchableOpacity>
            {/* {(isLoading || error) && (
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
            )} */}
            {!data && (
                <>
                    <View style={style.imageContainer}>
                        <Image source={{ uri: data?.imageUri }} style={style.image} />
                    </View>
                    <View style={{ width: '100%', alignSelf: 'center', marginVertical: 16 }}>
                        <Text variant='labelLarge' style={{ alignSelf: 'center' }}>
                            Level
                        </Text>
                        <View style={{ alignSelf: 'center', marginTop: 16, flexDirection: 'row' }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text variant='labelSmall'>EASY</Text>
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
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 24 }} onPress={handleOpenHint}>
                            <Octicons name='question' color={colors.secondary} size={24} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignSelf: 'center', marginVertical: 16 }}>
                        <Text variant='labelLarge' style={{ alignSelf: 'center' }}>
                            Answer
                        </Text>
                        <FormInput controler={control} label='Solution' name='' />
                    </View>
                    <View style={{ alignSelf: 'center', marginVertical: 16 }}>
                        <Text variant='labelLarge' style={{ alignSelf: 'center' }}>
                            Map
                        </Text>
                    </View>
                </>
            )}
        </SafeAreaView>
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
            overflow: 'hidden'
        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain'
        }
    });
