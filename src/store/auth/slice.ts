import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

import type { AuthResponse, AuthSchema, AuthUser } from '$models';
import { ACCESS_TOKEN_KEY } from '$shared/const';

const initialState: AuthSchema = {
    isAuth: false,
    user: {},
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<AuthResponse>) {
            state.isAuth = true;
            state.user = action.payload.user;
            localStorage.setItem(ACCESS_TOKEN_KEY, action.payload.accessToken);
        },

        checkAuth(state) {
            const token = localStorage.getItem(ACCESS_TOKEN_KEY);
            if (!token) {
                state.isAuth = false;
                state.user = {};

                return;
            }

            const decoded = jwtDecode<AuthUser>(token);
            state.isAuth = true;
            state.user = { id: decoded.id, email: decoded.email };
        },

        logout(state) {
            state.user = {};
            state.isAuth = false;
            localStorage.removeItem(ACCESS_TOKEN_KEY);
        },

        reset(state) {
            state.isAuth = false;
            state.user = {};
        },
    },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
