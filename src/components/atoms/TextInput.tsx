import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput as TextInputPaper, TextInputProps as TextInputPaperProps, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

export const TextInput = ({
    autoCapitalize,
    error,
    isPassword,
    keyboardType,
    label,
    style,
    value,
    ...props
}: TextInputPaperProps & { isPassword?: boolean }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { colors } = useTheme();
    const styleSheet = styles(colors);

    return (
        <TextInputPaper
            mode='outlined'
            dense
            label={label}
            value={value}
            secureTextEntry={isPassword && !showPassword}
            keyboardType={keyboardType}
            style={(styleSheet.input, style)}
            outlineColor={error ? colors.error : colors.secondary}
            selectionColor={colors.secondary}
            placeholderTextColor={colors.secondary}
            activeOutlineColor={error ? colors.error : colors.primary}
            textColor={colors.secondary}
            autoCapitalize={autoCapitalize}
            right={
                isPassword && (
                    <TextInputPaper.Icon
                        icon={!showPassword ? 'eye-off' : 'eye'}
                        color={colors.secondary}
                        onPress={() => setShowPassword(state => !state)}
                    />
                )
            }
            {...props}
        />
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        input: {
            color: colors.primary
        }
    });
