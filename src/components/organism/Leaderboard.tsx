import { useTranslation } from 'react-i18next';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { useGetAvatarQuery, useGetLeaderboardQuery } from '../../store/auth/authApi';
import { useEffect } from 'react';
import { getLeaderboardResponse } from '../../store/auth/types';


export const Leaderboard = () => {
    const { t } = useTranslation();
    const { colors } = useTheme();
    const style = styles(colors);
    const { refetch, data: leaderboardData, error, isLoading }= useGetLeaderboardQuery();
    const { refetch: refetchAvatar, data: avatarData, error: avatarError, isLoading: avatarIsloading } = useGetAvatarQuery();

    useEffect(() => {
        refetch();
        refetchAvatar();
      },[]);

      const LeaderboardComponent = ({ leaderboardData }: { leaderboardData: getLeaderboardResponse }) => (
        <View style={style.leaderboardTile}>
            <View>
            <Image
                source={{
                    uri: (() => {
                    switch (leaderboardData.imageUri) {
                        case 'adios.png':
                        return 'https://zpp-bucket.s3.eu-central-1.amazonaws.com/avatars/adios.png';
                        case 'pan_puzel.png':
                        return 'https://zpp-bucket.s3.eu-central-1.amazonaws.com/avatars/pan_puzel.png';
                        case 'pani_puzel.png':
                            return 'https://zpp-bucket.s3.eu-central-1.amazonaws.com/avatars/pani_puzel.png';
                        default:
                        return 'https://zpp-bucket.s3.eu-central-1.amazonaws.com/avatars/adios.png';
                    }
                    })(),
                }}
                style={style.profileImage}
                /> 
                </View>
                <View>
                <Text variant='titleSmall'>{leaderboardData.name} {'\n'} {leaderboardData.score}</Text>
            </View>
        </View>
      );

      const renderItem = ({ item }) => (
        <LeaderboardComponent key={item.id} leaderboardData={item} />
      );

    return (
        <View style={style.container}>
            <Text variant='titleLarge' style={style.title}>
                LEADERBOARD
            </Text>
            <FlatList
                data={leaderboardData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            flex: 0.5,
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
            backgroundColor: colors.secondary,
            borderRadius: 2,
            marginBottom: 16,
            marginHorizontal: 16
        },
        flatListContainer: {
            flex: 1
        },
        leaderboardTile: { 
            backgroundColor: colors.tertiary,
            flex: 0.35,
            padding: 10,
            borderRadius: 50,
            margin: 10,
            flexDirection: 'row',
            paddingEnd: 30,
        },
        profileImage: {
            borderRadius: 100,
            width: 60,
            height: 60,
        },
    });
