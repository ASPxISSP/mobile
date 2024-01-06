import Config from 'react-native-config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

const baseQuery = fetchBaseQuery({
    baseUrl: Config.API_URL,
    prepareHeaders: (headers, { getState }) => {
        const { token } = (getState() as RootState).auth;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    }
});

export const api = createApi({
    baseQuery,
    tagTypes: ['puzzles', 'user'],
    endpoints: () => ({})
});
