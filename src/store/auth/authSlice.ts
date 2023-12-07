import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import { AuthState } from './types';
import { RootState } from '../store';

const initialState: AuthState = {
    email: '',
    id: '',
    name: '',
    refreshToken: null,
    score: 0,
    token: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.refreshToken = null;
            state.token = null;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            authApi.endpoints.refreshToken.matchFulfilled,
            (state, { payload: { accessToken, refreshToken } }) => {
                state.token = accessToken;
                state.refreshToken = refreshToken;
            }
        );
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload: { accessToken, refreshToken } }) => {
                state.refreshToken = refreshToken;
                state.token = accessToken;
            }
        );
        builder.addMatcher(
            authApi.endpoints.getUser.matchFulfilled,
            (state, { payload: { email, id, name, score } }) => {
                state.email = email;
                state.id = id;
                state.name = name;
                state.score = score;
            }
        );
    }
});

export const { logout, setRefreshToken } = authSlice.actions;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
