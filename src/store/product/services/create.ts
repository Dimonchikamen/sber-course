import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '$app';
import type { CreateProductRequest, Exception, Product } from '$models';
import { productApi } from '$shared/api';
import { isExceptionData } from '$shared/lib';

export const createProduct = createAsyncThunk<Product, CreateProductRequest, ThunkConfig<Exception>>(
    'product/createProduct',
    async (payload, thunkApi) => {
        const { rejectWithValue } = thunkApi;
        const { data: responseData } = await productApi.createProduct(payload);

        if (isExceptionData(responseData)) {
            return rejectWithValue(responseData);
        } else {
            return responseData;
        }
    }
);
