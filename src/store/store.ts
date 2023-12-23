import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import authReducer from './auth/authSlice';
import puzzlesReducer from './puzzles/puzzlesSlices';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        puzzles: puzzlesReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
