import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

export interface City {
    available: boolean;
    descriptionKey: string;
    descriptionLink: string;
    image: ReactNode;
    name: string;
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 384,
        borderRadius: 24,
        resizeMode: 'cover'
    }
});

export const cities: City[] = [
    {
        available: true,
        descriptionKey: 'wroclaw',
        descriptionLink: 'https://en.wikipedia.org/wiki/Wroc%C5%82aw',
        image: (
            <Animated.Image
                style={styles.image}
                source={require('../assets/images/cities/wroclaw.jpeg')}
                sharedTransitionTag='city-Wrocław'
            />
        ),
        name: 'Wrocław'
    },
    {
        available: false,
        descriptionKey: 'poznan',
        descriptionLink: 'https://en.wikipedia.org/wiki/Pozna%C5%84',
        image: (
            <Animated.Image
                style={styles.image}
                source={require('../assets/images/cities/poznan.jpeg')}
                sharedTransitionTag='city-Poznań'
            />
        ),
        name: 'Poznań'
    },
    {
        available: false,
        descriptionKey: 'warszawa',
        descriptionLink: 'https://en.wikipedia.org/wiki/Warsaw',
        image: (
            <Animated.Image
                style={styles.image}
                source={require('../assets/images/cities/warszawa.jpg')}
                sharedTransitionTag='city-Warszawa'
            />
        ),
        name: 'Warszawa'
    },
    {
        available: false,
        descriptionKey: 'krakow',
        descriptionLink: 'https://en.wikipedia.org/wiki/Krak%C3%B3w',
        image: (
            <Animated.Image
                style={styles.image}
                source={require('../assets/images/cities/krakow.jpeg')}
                sharedTransitionTag='city-Kraków'
            />
        ),
        name: 'Kraków'
    },
    {
        available: false,
        descriptionKey: 'gdansk',
        descriptionLink: 'https://en.wikipedia.org/wiki/Gda%C5%84sk',
        image: (
            <Animated.Image
                style={styles.image}
                source={require('../assets/images/cities/gdansk.jpg')}
                sharedTransitionTag='city-Gdańsk'
            />
        ),
        name: 'Gdańsk'
    }
];
