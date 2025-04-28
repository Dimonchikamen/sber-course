import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { GetCartFullProductListResponse, GetCartShortProductListResponse } from '$models';
import { ACCESS_TOKEN_KEY } from '$shared/const';
import { exceptionAdapter } from '$shared/lib';

const basePath = '/cart';

export const cartApi = createApi({
    reducerPath: 'cart/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
        prepareHeaders: headers => {
            headers.set('authorization', localStorage.getItem(ACCESS_TOKEN_KEY) || '');

            return headers;
        },
    }),
    tagTypes: ['get-full'],
    endpoints: build => ({
        getCartFullProductList: build.query<GetCartFullProductListResponse, undefined>({
            query: () => ({
                url: `${basePath}-full`,
            }),
            transformErrorResponse: exceptionAdapter,
            providesTags: ['get-full'],
        }),
        getCartShortProductList: build.query<GetCartShortProductListResponse, undefined>({
            query: () => ({
                url: basePath,
            }),
            transformErrorResponse: exceptionAdapter,
        }),
        addProductToCart: build.mutation<string, string>({
            query: productId => ({
                url: `${basePath}/add`,
                method: 'POST',
                body: {
                    productId,
                },
            }),
            invalidatesTags: ['get-full'],
        }),
        removeProductFromCart: build.mutation<string, string>({
            query: id => ({
                url: `${basePath}/remove/${id}`,
                method: 'DELETE',
            }),
            transformErrorResponse: exceptionAdapter,
            invalidatesTags: ['get-full'],
        }),
        deleteProductFromCart: build.mutation<string, string>({
            query: id => ({
                url: `${basePath}/delete/${id}`,
                method: 'DELETE',
            }),
            transformErrorResponse: exceptionAdapter,
        }),
    }),
});

export const {
    useGetCartFullProductListQuery,
    useGetCartShortProductListQuery,
    useAddProductToCartMutation,
    useRemoveProductFromCartMutation,
    useDeleteProductFromCartMutation,
} = cartApi;
