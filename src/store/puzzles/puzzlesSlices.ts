import { createSlice } from '@reduxjs/toolkit';
import { puzzlesApi } from './puzzlesApi';
import { PuzzleState } from './types';
import { RootState } from '../store';

const initialState: PuzzleState = {
    puzzles: []
};

const puzzlesSlice = createSlice({
    name: 'puzzles',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(puzzlesApi.endpoints.getPuzzles.matchFulfilled, (state, { payload: { data } }) => {
            state.puzzles = [...state.puzzles, ...data];
        });
    }
});

export const selectPuzzles = (state: RootState) => state.puzzles.puzzles;

export default puzzlesSlice.reducer;
