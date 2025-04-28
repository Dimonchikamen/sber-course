import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { UserLike, UserSchema } from '$models';

import { getUserByToken } from './services';

const initialState: UserSchema = {
    isLoading: false,
    user: {},
    exception: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserLike(state, action: PayloadAction<UserLike>) {
            state.user.likes.push(action.payload);
        },
        removeUserLike(state, action: PayloadAction<UserLike>) {
            state.user.likes = state.user.likes.filter(like => like.id !== action.payload.id);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getUserByToken.pending, state => {
                state.isLoading = true;
                state.user = {};
                state.exception = null;
            })
            .addCase(getUserByToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(getUserByToken.rejected, (state, action) => {
                state.isLoading = false;
                state.exception = action.payload || null;
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
