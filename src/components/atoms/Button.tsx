import { ViewStyle } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

interface ButtonProps {
    title: string;
    isLoading?: boolean;
    styles?: ViewStyle;
    onPress: () => void;
}

export const Button = ({ title, isLoading, onPress, styles }: ButtonProps) => {
    return (
        <PaperButton
            loading={isLoading}
            labelStyle={isLoading && { marginStart: 0, height: 26 }}
            onPress={onPress}
            mode='contained'
            style={styles}
        >
            {!isLoading && title}
        </PaperButton>
    );
};
