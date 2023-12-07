import { GetUserResponse, LoginResponse, RefreshTokenResponse } from './types';
import { LoginSchema, RefreshTokenSchema, RegisterSchema } from '../../schemas/authSchema';
import { api } from '../api';

export const authApi = api.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query<GetUserResponse, void>({
            query: () => ({
                url: 'auth/profile'
            })
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
            query: ({ email, name, password }) => ({
                url: 'auth/register',
                method: 'POST',
                body: {
                    email,
                    name,
                    password
                }
            })
        })
    })
});

export const { useLazyGetUserQuery, useLoginMutation, useRefreshTokenMutation, useRegisterMutation } = authApi;
