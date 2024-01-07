import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

interface PermissionProps {
    title: string;
    icon: ReactNode;
    description: string;
}

export const Permission = ({ title, icon, description }: PermissionProps) => {
    const { colors } = useTheme();
    const style = styles(colors);

    return (
        <>
            <View style={style.permissionContainer}>
                {icon}
                <Text variant='titleSmall' style={style.permissionTitle}>
                    {title}
                </Text>
            </View>
            <Text variant='bodyLarge' style={style.reason}>
                {description}
            </Text>
        </>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        reason: {
            marginHorizontal: 32,
            marginTop: 16,
            marginBottom: 32,
            color: colors.secondary
        },
        permissionContainer: {
            flexDirection: 'row',
            marginHorizontal: 32,
            alignItems: 'center'
        },
        permissionTitle: {
            color: colors.secondary,
            fontWeight: 'bold',
            marginLeft: 32
        }
    });
