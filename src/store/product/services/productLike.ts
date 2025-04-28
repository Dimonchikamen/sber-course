import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '$app';
import type { GetProductListParams, ProductData } from '$models';
import { PRODUCT_LIST_PER_PAGE_DEFAULT_VALUE } from '$shared/const';
import { notEmpty } from '$shared/lib';

import { productApi as productRtkApi } from '../api';

export const updateProductLikes = createAsyncThunk<undefined, string, ThunkConfig<undefined>>(
    'product/updateProductLikes',
    async (productId, thunkApi) => {
        const { fulfillWithValue, getState, dispatch } = thunkApi;

        const thisApi = getState()['product/api'];

        if (notEmpty(thisApi.subscriptions.getProducts)) {
            const getProductListEndpoint = thisApi.queries.getProducts!;
            const products = (getProductListEndpoint.data as ProductData).products;
            const productListParams = getProductListEndpoint.originalArgs as GetProductListParams;
            const changedIndex = products.findIndex(product => product.id === productId);
            const page = Math.floor(
                (changedIndex + 1) / (productListParams.perPage || PRODUCT_LIST_PER_PAGE_DEFAULT_VALUE) + 1
            );
            dispatch(productRtkApi.endpoints.getProducts.initiate({ ...productListParams, page }));
        }

        return fulfillWithValue(undefined);
    }
);
