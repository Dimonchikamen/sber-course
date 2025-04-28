import { createAsyncThunk } from '@reduxjs/toolkit';

import type { ThunkConfig } from '$app';

import { cartApi } from '../api';

export const updateCartAfterDeleteProduct = createAsyncThunk<undefined, string, ThunkConfig<undefined>>(
    'cart/updateCartAfterDeleteProduct',
    async (productId, thunkApi) => {
        const { fulfillWithValue, dispatch } = thunkApi;

        dispatch(
            cartApi.util.updateQueryData('getCartFullProductList', undefined, draft => {
                const currentProductItemIndex = draft.products.findIndex(pr => pr.product.id === productId);

                draft.count = draft.count - draft.products[currentProductItemIndex].count;
                draft.products.splice(currentProductItemIndex, 1);
            })
        );

        dispatch(
            cartApi.util.updateQueryData('getCartShortProductList', undefined, draft => {
                const currentProductItemIndex = draft.products.findIndex(pr => pr.id === productId);

                draft.count = draft.count - draft.products[currentProductItemIndex].count;
                draft.products.splice(currentProductItemIndex, 1);
            })
        );

        return fulfillWithValue(undefined);
    }
);

export const updateCartAfterAddProduct = createAsyncThunk<undefined, string, ThunkConfig<undefined>>(
    'cart/updateCartAfterAddProduct',
    async (productId, thunkApi) => {
        const { fulfillWithValue, dispatch } = thunkApi;

        dispatch(
            cartApi.util.updateQueryData('getCartFullProductList', undefined, draft => {
                draft.count++;
                const products = draft.products;
                const currentProduct = products.find(pr => pr.product.id === productId);
                if (currentProduct) {
                    currentProduct.count++;
                }
            })
        );

        dispatch(
            cartApi.util.updateQueryData('getCartShortProductList', undefined, draft => {
                draft.count++;
                const products = draft.products;
                const currentProduct = products.find(pr => pr.id === productId);
                if (currentProduct) {
                    currentProduct.count++;
                } else {
                    products.push({ id: productId, count: 1 });
                }
            })
        );

        return fulfillWithValue(undefined);
    }
);

export const updateCartAfterRemoveProduct = createAsyncThunk<undefined, string, ThunkConfig<undefined>>(
    'cart/updateCartAfterRemoveProduct',
    async (productId, thunkApi) => {
        const { fulfillWithValue, dispatch } = thunkApi;

        dispatch(
            cartApi.util.updateQueryData('getCartFullProductList', undefined, draft => {
                draft.count--;
                const products = draft.products;
                const currentProduct = products.find(pr => pr.product.id === productId);
                if (currentProduct) {
                    currentProduct.count--;
                }
            })
        );

        dispatch(
            cartApi.util.updateQueryData('getCartShortProductList', undefined, draft => {
                draft.count--;
                const products = draft.products;
                const currentProductIndex = products.findIndex(pr => pr.id === productId);
                if (currentProductIndex > -1) {
                    products[currentProductIndex].count--;
                }

                if (products[currentProductIndex].count === 0) {
                    products.splice(currentProductIndex, 1);
                }
            })
        );

        return fulfillWithValue(undefined);
    }
);
