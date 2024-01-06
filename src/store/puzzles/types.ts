export interface Puzzle {
    address: string;
    city: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    id: number;
    isSolved: boolean;
    isUnlocked: boolean;
    imageUri: string;
    latitude: number;
    longitude: number;
    solution: string;
    tip: string;
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

// GET /user/puzzles
export type GetUserPuzzlesResponse = Puzzle[];

// POST /puzzle/id/solve
export interface SolvePuzzleRequest {
    id: number;
    latitude: number;
    longitude: number;
    solution: string;
}
