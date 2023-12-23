export interface Puzzle {
    address: string;
    city: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    id: number;
    isUnlocked: boolean;
    imageUri: string;
    latitude: number;
    longitude: number;
    solution: string;
}

export interface PuzzleState {
    puzzles: Puzzle[];
}

// GET /puzzle/:id
export type GetPuzzleResponse = Puzzle;

export interface PuzzlesQueryParams {
    size?: number;
    page?: number;
    city?: string;
}

// GET /puzzle
export interface GetPuzzlesResponse {
    data: Puzzle[];
    meta: {
        page: number;
        size: number;
        total: number;
    };
}

// POST /puzzle/id/solve
export interface SolvePuzzleRequest {
    id: number;
    latitude: number;
    longitude: number;
    solution: string;
}
