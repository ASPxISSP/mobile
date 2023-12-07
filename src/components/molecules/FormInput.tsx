import { Control, Controller, FieldError } from 'react-hook-form';
import { KeyboardTypeOptions, StyleSheet, View, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { TextInput } from '../atoms/TextInput';

interface FormInputProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    controler: Control<any>;
    label: string;
    name: string;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    defaultValue?: string;
    errorMessage?: string;
    isError?: FieldError;
    password?: boolean;
    keyboardType?: KeyboardTypeOptions;
    style?: ViewStyle;
}

export const FormInput = ({
    controler,
    label,
    name,
    autoCapitalize,
    defaultValue,
    errorMessage,
    isError,
    password,
    keyboardType,
    style
}: FormInputProps) => {
    const { colors } = useTheme();
    const styleSheet = styles(colors);
    return (
        <View style={{ ...styleSheet.container, ...style }}>
            <Controller
                control={controler}
                name={name}
                render={({ field: { onChange, value } }) => {
                    const allProps = {
                        style: styleSheet.input,
                        label,
                        value,
                        autoCapitalize,
                        keyboardType
                    };

                    return (
                        <TextInput
                            {...allProps}
                            isPassword={password}
                            error={isError ? true : false}
                            onChangeText={onChange}
                        />
                    );
                }}
                defaultValue={defaultValue}
            />
            {isError && errorMessage && (
                <Text variant='bodyMedium' style={styleSheet.errorMessage}>
                    {errorMessage}
                </Text>
            )}
        </View>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        container: {
            width: '80%'
        },
        input: {
            marginBottom: 8,
            textAlign: 'auto'
        },
        errorMessage: {
            color: colors.error,
            marginHorizontal: 16,
            marginBottom: 8
        }
    });
