import { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardView } from '../../utils/KeyboardView';

interface Props {
    children: ReactNode;
    noAuth?: boolean;
}

export const ScrollScreen = ({ children }: Props) => {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <KeyboardView>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={style.scrollViewContainer}
            >
                <SafeAreaView edges={['left', 'top', 'right']} style={style.safeAreaView}>
                    {children}
                </SafeAreaView>
            </ScrollView>
        </KeyboardView>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        scrollViewContainer: {
            flexGrow: 1
        },
        safeAreaView: {
            flex: 1,
            backgroundColor: colors.background
        }
    });
