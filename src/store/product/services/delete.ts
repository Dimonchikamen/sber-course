import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '$app';
import type { Exception, Product } from '$models';
import { productApi } from '$shared/api';
import { isExceptionData } from '$shared/lib';

export const deleteProduct = createAsyncThunk<Product, string, ThunkConfig<Exception>>(
    'product/deleteProduct',
    async (payload, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        const { data: responseData } = await productApi.deleteProduct(payload);

        if (isExceptionData(responseData)) {
            return rejectWithValue(responseData);
        } else {
            return responseData;
        }
    }
);
