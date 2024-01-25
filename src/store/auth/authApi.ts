import { GetAvatarResponse, GetUserResponse, LoginResponse, RefreshTokenResponse, getLeaderboardResponse } from './types';
import { LoginSchema, RefreshTokenSchema, RegisterSchema } from '../../schemas/authSchema';
import { api } from '../api';

export const authApi = api.injectEndpoints({
    endpoints: builder => ({
        getAvatar: builder.query<GetAvatarResponse[], void>({
            query: () => ({
                url: 'image/avatar'
            })
        }),
        getUser: builder.query<GetUserResponse, void>({
            query: () => ({
                url: 'user/profile'
            }),
            providesTags: ['user']
        }),
        login: builder.mutation<LoginResponse, LoginSchema>({
            query: body => ({
                url: 'auth/login',
                method: 'POST',
                body
            })
        }),
        refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenSchema>({
            query: body => ({
                url: 'auth/refresh',
                method: 'POST',
                body
            })
        }),
        register: builder.mutation<void, RegisterSchema>({
            query: ({ email, imageUri, name, password }) => ({
                url: 'auth/register',
                method: 'POST',
                body: {
                    email,
                    imageUri,
                    name,
                    password
                }
            })
        }),
        getLeaderboard: builder.query<getLeaderboardResponse[], void>({
            query: () => ({
                url: 'leaderboard'
            }),
        })
    })
});

export const {
    useGetAvatarQuery,
    useLazyGetUserQuery,
    useLoginMutation,
    useRefreshTokenMutation,
    useRegisterMutation,
    useGetLeaderboardQuery
} = authApi;
