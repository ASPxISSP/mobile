import { configureFonts, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ModalProvider } from './src/context/ModalContext';
import { Navigation } from './src/navigation';
import { store } from './src/store/store';
import { LightTheme } from './src/theme';
import { fontConfig } from './src/theme/typography';

function App(): JSX.Element {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <PaperProvider theme={{ ...LightTheme, fonts: configureFonts({ config: fontConfig }) }}>
                    <ModalProvider>
                        <Navigation />
                    </ModalProvider>
                </PaperProvider>
            </Provider>
        </SafeAreaProvider>
    );
}

export default App;
