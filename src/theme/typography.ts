import { Platform } from 'react-native';

type Font = {
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    fontStyle?: 'normal' | 'italic' | undefined;
};

type MD3Type = {
    fontFamily?: string;
    letterSpacing?: number;
    fontWeight?: Font['fontWeight'];
    lineHeight?: number;
    fontSize?: number;
    fontStyle?: Font['fontStyle'];
};

export const fontConfig: Record<string, MD3Type> = {
    titleLarge: {
        fontFamily: Platform.select({
            android: 'Nunito-ExtraBold',
            ios: 'Nunito-Bold',
            default: 'Nunito-Bold'
        }),
        fontWeight: Platform.select({
            ios: '700'
        }),
        fontSize: 26,
        lineHeight: 32
    },
    titleMedium: {
        fontFamily: Platform.select({
            android: 'Nunito-ExtraBold',
            ios: 'Nunito-Bold',
            default: 'Nunito-Bold'
        }),
        fontWeight: Platform.select({
            ios: '700'
        }),
        fontSize: 22,
        lineHeight: 30
    },
    titleSmall: {
        fontFamily: Platform.select({
            android: 'Nunito-ExtraBold',
            ios: 'Nunito-Bold',
            default: 'Nunito-Bold'
        }),
        fontWeight: Platform.select({
            ios: '700'
        }),
        fontSize: 18,
        lineHeight: 26
    },
    labelLarge: {
        fontFamily: Platform.select({
            android: 'Nunito-SemiBold',
            ios: 'Nunito-SemiBold',
            default: 'Nunito-SemiBold'
        }),
        fontWeight: Platform.select({
            ios: '600'
        }),
        fontSize: 18,
        lineHeight: 26
    },
    labelMedium: {
        fontFamily: Platform.select({
            android: 'Nunito-SemiBold',
            ios: 'Nunito-SemiBold',
            default: 'Nunito-SemiBold'
        }),
        fontWeight: Platform.select({
            ios: '600'
        }),
        fontSize: 16,
        lineHeight: 24
    },
    labelSmall: {
        fontFamily: Platform.select({
            android: 'Nunito-SemiBold',
            ios: 'Nunito-SemiBold',
            default: 'Nunito-SemiBold'
        }),
        fontWeight: Platform.select({
            ios: '600'
        }),
        fontSize: 14,
        lineHeight: 20
    },
    bodyLarge: {
        fontFamily: Platform.select({
            android: 'Nunito-Regular',
            ios: 'Nunito-Regular',
            default: 'Nunito-Regular'
        }),
        fontWeight: Platform.select({
            ios: '400'
        }),
        fontSize: 14,
        lineHeight: 20
    },
    bodyMedium: {
        fontFamily: Platform.select({
            android: 'Nunito-Regular',
            ios: 'Nunito-Regular',
            default: 'Nunito-Regular'
        }),
        fontWeight: Platform.select({
            ios: '400'
        }),
        fontSize: 12,
        lineHeight: 16
    },
    bodySmall: {
        fontFamily: Platform.select({
            android: 'Nunito-Regular',
            ios: 'Nunito-Regular',
            default: 'Nunito-Regular'
        }),
        fontWeight: Platform.select({
            ios: '400'
        }),
        fontSize: 10,
        lineHeight: 14
    }
};
