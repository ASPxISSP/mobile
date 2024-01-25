import { useTranslation } from 'react-i18next';
import { StyleSheet, Image, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../components/atoms/Button';
import { logout } from '../../store/auth/authSlice';
import { useAppDispatch } from '../../store/hooks';
import React, { useEffect } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { useLazyGetUserQuery } from '../../store/auth/authApi';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { Leaderboard } from '../../components/organism/Leaderboard';
import { SvgXml } from 'react-native-svg';

export const ProfileScreen = () => {
    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const { colors } = useTheme();
    const style = styles(colors);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('refreshToken');
        dispatch(logout());
    };
    const [ refetchUser, { data }] = useLazyGetUserQuery();
    
    useEffect(() => {
        refetchUser();
      },[]);

      const svgContent = `
      <svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.47 68.75">
      <defs>
        <style>
          .cls-1 {
            fill: #fcf6EF;
            stroke-width: 0px;
          }
        </style>
      </defs>
      <g id="graphics">
        <path class="cls-1" d="m1.84,30.79C.3,22.31-.88,13.8.88,5.16,1.46,2.31,3.37,1.45,6.23.99,15.01-.45,23.81.2,32.61.08,38.94-.01,45.27-.01,51.6.02c5.42.03,7.52,2.16,7.8,7.45.28,5.31.75,10.61.99,15.92.06,1.37.81,3.19-.91,4.05-1.4.7-2.45-.64-3.55-1.29-4.76-2.81-9.4-2.13-12.36,1.84-2.61,3.49-2,9.8,1.25,12.88,3.89,3.69,8.22,2.32,12.02.33,3.76-1.97,4.27-.92,4.87,2.72.93,5.66.58,11.29.76,16.93.09,2.81-1.36,4.4-3.96,4.91-3.58.7-7.19,1.78-10.78,1.72-11.82-.17-23.56,1.79-35.38,1.1-7.14-.42-8.42-1.59-8.47-8.7-.03-4.67-.29-9.29-.97-13.92-.45-3.06.72-4.83,3.91-2.6,3.71,2.59,7.17,2.17,10.55-.42,3.21-2.46,3.42-5.82,2.66-9.47-.99-4.75-4.86-7.29-9.56-5.93-2.85.82-5.58,2.08-8.62,3.24Z"/>
      </g>
    </svg>`;

    return (
        <SafeAreaView style={style.container}>
            <View style={style.top} > 
            <Image
                source={{
                    uri: data?.imageUri,
                  }}
                style={style.profileImage}
            />
                <View > 
                <Text  style={style.text} variant='titleLarge'> {data?.name} </Text> 
                <Text  style={style.text} variant='labelMedium'>  {data?.email} </Text>
                </View>
             
                
                
                <View style={style.score}>
                <View style={style.svgContainer}>
                    <SvgXml
                    xml={svgContent}
                    width="40%"
                    height="40%"
                    />
                </View>
                <View style={style.scoreTextContainer}>
                    <Text style={style.text} variant='labelSmall'> SCORE </Text> 
                    <Text style={style.text} variant='labelSmall'> {'  '} {data?.score} </Text>
                </View>
                </View>

            </View>
            <Leaderboard />
           
            <Button styles={style.logout} onPress={handleLogout} text={t('profile.logout')} />
        </SafeAreaView>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.background,
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
            backgroundColor: colors.primary
        },
        score: {
            marginTop: "35%",
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: -100,
        },
        svgContainer: {
            flex: 1,
            marginRight: -250, 
        },
        scoreTextContainer: {
            flex: 1,
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
        },
    });
