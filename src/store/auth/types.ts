export interface AuthState {
    email: string;
    id: string;
    name: string;
    refreshToken: string | null;
    score: number;
    token: string | null;
}

// GET /auth/profile
export interface GetUserResponse {
    id: string;
    email: string;
    name: string;
    score: number;
}

// POST /auth/login
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

// POST /auth/refresh
export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}
