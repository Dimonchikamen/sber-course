import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '$app';
import type { Exception, User } from '$models';
import { userApi } from '$shared/api';
import { isExceptionData } from '$shared/lib';

export const getUserByToken = createAsyncThunk<User, undefined, ThunkConfig<Exception>>(
    'user/getUserByToken',
    async (_, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        const { data: responseData } = await userApi.getUserByToken();

        if (isExceptionData(responseData)) {
            return rejectWithValue(responseData);
        } else {
            return responseData;
        }
    }
);
