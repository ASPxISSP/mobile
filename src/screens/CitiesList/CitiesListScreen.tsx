import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CitiesList } from '../../components/organism/CitiesList';

export const CitiesListScreen = () => {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <SafeAreaView edges={['left', 'right', 'top']} style={style.container}>
            <CitiesList />
        </SafeAreaView>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
        }
    });
