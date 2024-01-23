export interface AuthState {
    email: string;
    id: string;
    name: string;
    refreshToken: string | null;
    score: number;
    token: string | null;
}

// GET /image/avatar
export interface GetAvatarResponse {
    name: string;
    url: string;
}

// GET /auth/profile
export interface GetUserResponse {
    id: string;
    email: string;
    name: string;
    imageUri: string,
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
