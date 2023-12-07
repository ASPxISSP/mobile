import { MD3LightTheme, MD3Theme } from 'react-native-paper';

export const LightTheme: MD3Theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        background: '#fdf6ee',
        primary: '#f66418',
        secondary: '#3d485b',
        surface: '#2ba052',
        backdrop: '#747d90',
        error: '#eb2315',
        tertiary: '#b5e3c4',
        scrim: '#ffffff'
    }
};
