import { GetPuzzlesResponse, Puzzle, PuzzlesQueryParams, SolvePuzzleRequest } from './types';
import { api } from '../api';

export const puzzlesApi = api.injectEndpoints({
    endpoints: builder => ({
        getPuzzle: builder.query<Puzzle, { id: number }>({
            query: ({ id }) => ({
                url: `puzzle/${id}`
            })
        }),
        getPuzzles: builder.query<GetPuzzlesResponse, PuzzlesQueryParams>({
            query: params => ({
                url: 'user/puzzle',
                params
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.data.push(...newItems.data);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        solvePuzzle: builder.mutation<void, SolvePuzzleRequest>({
            query: ({ id, latitude, longitude, solution }) => ({
                url: `puzzle/${id}/solve`,
                body: {
                    latitude,
                    longitude,
                    solution
                }
            })
        })
    })
});

export const { useGetPuzzlesQuery, useGetPuzzleQuery, useSolvePuzzleMutation } = puzzlesApi;
