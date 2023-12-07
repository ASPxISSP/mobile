import { createContext, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { Text, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';
import { Button } from '../../components/atoms/Button';

interface Props {
    children?: ReactNode;
}

interface Context {
    setModalDetails: (message: string, title: string) => void;
    toggleModalVisibility: () => void;
}

export const ModalContext = createContext<Context>({
    setModalDetails: () => {},
    toggleModalVisibility: () => {}
});

export const ModalProvider = ({ children }: Props) => {
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation();
    const { colors } = useTheme();
    const style = styles(colors);

    const setModalDetails = (message: string, title: string) => {
        setModalMessage(message);
        setModalTitle(title);
    };

    const toggleModalVisibility = () => {
        setShowModal(state => !state);
    };

    return (
        <ModalContext.Provider value={{ setModalDetails, toggleModalVisibility }}>
            <ReactNativeModal isVisible={showModal} animationIn='slideInDown' animationOut='slideOutUp'>
                <View style={style.modalContainer}>
                    <View>
                        <Text variant='titleMedium' style={style.title}>
                            {modalTitle}
                        </Text>
                        <Text variant='bodyLarge' style={style.message}>
                            {modalMessage}
                        </Text>
                    </View>
                    <Button onPress={toggleModalVisibility} title={t('modal.button')} />
                </View>
            </ReactNativeModal>
            {children}
        </ModalContext.Provider>
    );
};

const styles = (colors: MD3Colors) =>
    StyleSheet.create({
        modalContainer: {
            padding: 16,
            borderRadius: 30,
            backgroundColor: colors.background,
            alignItems: 'center'
        },
        title: {
            color: colors.secondary,
            marginBottom: 16,
            textAlign: 'center'
        },
        message: {
            color: colors.secondary,
            marginBottom: 32,
            marginHorizontal: 16
        }
    });
