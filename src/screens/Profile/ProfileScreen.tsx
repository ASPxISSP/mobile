import { useTranslation } from 'react-i18next';
import { StyleSheet, Image, View} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../components/atoms/Button';
import { logout, selectRefreshToken, selectUserData } from '../../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import React, { useContext, useEffect } from 'react';
import { RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';
import { ModalContext } from '../../context/ModalContext';
import { useGetAvatarQuery, useLazyGetUserQuery, useRegisterMutation } from '../../store/auth/authApi';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CitiesScreenParamList } from '../../navigation/BottomTabs';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { SolvedByUserList } from '../../components/organism/SolvedByUserList';

export const ProfileScreen = () => {
    const dispatch = useAppDispatch();
    const refreshToken = useAppSelector(selectRefreshToken);
    const userData = useAppSelector(selectUserData);

    const { t } = useTranslation();

    const { colors } = useTheme();
    const style = styles(colors);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('refreshToken');
        dispatch(logout());
    };

    // const { navigate } = useNavigation<NativeStackNavigationProp<CitiesScreenParamList>>();
    // const { goBack } = useNavigation<NativeStackNavigationProp<CitiesScreenParamList>>();
    // const { setModalDetails, toggleModalVisibility } = useContext(ModalContext);
    // const [ refetch, {data, error} ] = useLazyGetUserQuery();
    // const { refetch, data, error, isLoading } = useGetAvatarQuery();
    const {  data, error, refetch, isError, isLoading } = useLazyGetUserQuery();
    // const [refetch, { data, error, isError, isLoading }] = useLazyGetUserQuery();
    // const { data: solveResponse, isLoading: isSolvePuzzleLoading, error: solvePuzzleError } =
    // useRegisterMutation();  dcs q1a
 

    useEffect(() => {
        console.log( "USER DATA", userData, "AVATARY:", data);
      });

       
    // const userAvatarData: GetAvatarResponse[] | undefined = data;
    // const { userData } = useLazyGetUserQuery();
    // const [solvePuzzle, { data: GetUserResponse }] =
    //     useRegisterMutation();

    
    return (
        <SafeAreaView style={style.container}>
            <View style={style.top} > 
            <Image
                source={{
                    uri: "https://zpp-bucket.s3.eu-central-1.amazonaws.com/avatars/pani_puzel.png",
                  }}
                style={style.profileImage}
            />
                <View > 
                <Text  style={style.text} variant='titleLarge'> {data.name} </Text> 
                <Text  style={style.text} variant='labelMedium'>  {userData.email} </Text>
                </View>

                <View style={style.score}> 
                <Text  style={style.text} variant='labelSmall'> SCORE </Text> 
                <Text  style={style.text} variant='labelSmall'> {'  '} {userData.score} </Text>
                </View>
            </View>
            <SolvedByUserList />
           
            <Button styles={style.logout} onPress={handleLogout} title={t('profile.logout')} />
        </SafeAreaView>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.background
        },
        top: {
            flex: 0.4,
            width: '100%',
            flexDirection: 'row',
            backgroundColor: colors.secondary,
            paddingHorizontal: 20,
            alignItems: 'center', 
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
        },
        profileImage: {
            width: 120,
            height: 190,
            borderRadius: 65,
            marginLeft: "3%", 
            marginTop: "40%",
        },
        score: {
            marginTop: "35%",
        },
        text: {
            color: colors.background,
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        userNameText: {
            color: colors.background,
            textAlign: 'left',
            alignItems: 'flex-start',
        },
        logout: {
            width: 160,
            marginBottom: 16,
            alignItems: 'center',
            backgroundColor: colors.secondary,
        }
    });
