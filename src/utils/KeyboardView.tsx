import { ReactNode, useState } from 'react';
import {
    Animated,
    Dimensions,
    EmitterSubscription,
    Keyboard,
    KeyboardAvoidingView,
    KeyboardAvoidingViewProps,
    Platform,
    StyleSheet,
    TextInput
} from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
import { useMount } from '../hooks/useMount';

interface Props {
    children: ReactNode;
    iOSKeyboardVerticalOffset?: KeyboardAvoidingViewProps['keyboardVerticalOffset'];
}

export const KeyboardView = ({ children, iOSKeyboardVerticalOffset }: Props) => {
    const [shift] = useState(new Animated.Value(0));
    const keyboard = useKeyboard();

    const [didShowListener, setDidShowListener] = useState<EmitterSubscription | null>();
    const [didHideListener, setDidHideListener] = useState<EmitterSubscription | null>();

    useMount(() => {
        setDidShowListener(Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow));
        setDidHideListener(Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide));
        return () => {
            if (didShowListener) {
                didShowListener.remove();
            }
            if (didHideListener) {
                didHideListener.remove();
            }
        };
    });

    const handleKeyboardDidShow = () => {
        const { height: windowHeight } = Dimensions.get('window');
        const { keyboardHeight } = keyboard;
        const currentlyFocusedInputRef = TextInput.State.currentlyFocusedInput();
        currentlyFocusedInputRef?.measure((_x, _y, _width, height, _pageX, pageY) => {
            const fieldHeight = height;
            const fieldTop = pageY;
            const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
            if (gap >= 0) {
                return;
            }
            Animated.timing(shift, {
                toValue: gap,
                duration: 1000,
                useNativeDriver: true
            }).start();
        });
    };

    const handleKeyboardDidHide = () => {
        Animated.timing(shift, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start();
    };

    if (Platform.OS === 'android') {
        return (
            <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>{children}</Animated.View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
            keyboardVerticalOffset={iOSKeyboardVerticalOffset}
        >
            {children}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
