import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, IUser, MOCK_USERS } from '../../models/auth.models';

const LS_AUTH_KEY = 'auth_user';

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem(LS_AUTH_KEY) ?? 'null'),
    isAuthenticated: !!localStorage.getItem(LS_AUTH_KEY),
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ username: string; password: string }>) {
            const { username, password } = action.payload;
            
            // In a real app, you would validate the password against a hash
            // For this mock, we'll just check if the username exists and use the password as a simple check
            const user = MOCK_USERS.find(u => u.username === username && password === username);
            
            if (user) {
                state.user = user;
                state.isAuthenticated = true;
                localStorage.setItem(LS_AUTH_KEY, JSON.stringify(user));
            }
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem(LS_AUTH_KEY);
        },
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
