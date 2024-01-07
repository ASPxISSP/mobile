import { GetUserPuzzlesResponse, Puzzle, PuzzlesQueryParams, SolvePuzzleRequest } from './types';
import { api } from '../api';

export const puzzlesApi = api.injectEndpoints({
    endpoints: builder => ({
        getPuzzle: builder.query<Puzzle, { id: number }>({
            query: ({ id }) => ({
                url: `puzzle/${id}`
            })
        }),
        getPuzzles: builder.query<GetUserPuzzlesResponse, PuzzlesQueryParams | void>({
            query: params => ({
                url: 'user/puzzles',
                params
            }),
            providesTags: ['puzzles']
        }),
        solvePuzzle: builder.mutation<{ points: number }, SolvePuzzleRequest>({
            query: ({ id, latitude, longitude, solution }) => ({
                url: `puzzle/${id}/solve`,
                body: {
                    latitude,
                    longitude,
                    solution
                },
                method: 'POST'
            }),
            invalidatesTags: ['puzzles', 'user']
        })
    })
});

export const { useGetPuzzlesQuery, useGetPuzzleQuery, useSolvePuzzleMutation } = puzzlesApi;
