export interface IUser {
    id: string;
    username: string;
    role: 'user' | 'admin';
}

export interface AuthState {
    user: IUser | null;
    isAuthenticated: boolean;
}

// Mock user data
export const MOCK_USERS: IUser[] = [
    {
        id: '1',
        username: 'user',
        role: 'user'
    },
    {
        id: '2',
        username: 'admin',
        role: 'admin'
    }
];
