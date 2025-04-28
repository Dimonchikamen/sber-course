import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
    GetProductListParams,
    LikeProductResponse,
    Product,
    ProductData,
    RemoveLikeProductResponse,
} from '$models';
import { ACCESS_TOKEN_KEY, API_URL } from '$shared/const';
import { exceptionAdapter } from '$shared/lib';

const basePath = '/products';

export const productApi = createApi({
    reducerPath: 'product/api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: headers => {
            headers.set('authorization', localStorage.getItem(ACCESS_TOKEN_KEY) || '');

            return headers;
        },
    }),
    tagTypes: ['product-list', 'product-list-favorite', 'product-detail'],
    endpoints: build => ({
        getProducts: build.query<ProductData, GetProductListParams>({
            query: params => ({
                url: basePath,
                params,
            }),
            transformErrorResponse: exceptionAdapter,
            serializeQueryArgs: ({ endpointName, queryArgs: { searchTerm } }) => {
                return endpointName + searchTerm;
            },
            merge: (currentCacheData, responseData) => {
                responseData.products.forEach(product => {
                    const cacheIndex = currentCacheData.products.findIndex(
                        cachedProduct => cachedProduct.id === product.id
                    );

                    if (cacheIndex === -1) {
                        currentCacheData.products.push(product);
                    } else {
                        currentCacheData.products[cacheIndex] = product;
                    }
                });
            },
            forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
            providesTags: ['product-list'],
        }),
        getFavoriteProducts: build.query<Product[], string>({
            query: () => ({
                url: basePath,
            }),
            transformErrorResponse: exceptionAdapter,
            transformResponse: (res: ProductData, _, userId) =>
                res.products?.filter(product => product.likes.some(like => like.userId === userId)) || [],
            providesTags: ['product-list-favorite'],
        }),
        getProductById: build.query<Product, string>({
            query: id => ({
                url: `${basePath}/${id}`,
            }),
            transformErrorResponse: exceptionAdapter,
            providesTags: (_, __, id) => [{ type: 'product-detail', id }],
        }),

        addProductLike: build.mutation<LikeProductResponse, string>({
            query: id => ({
                url: `${basePath}/${id}/likes`,
                method: 'PUT',
            }),
            transformErrorResponse: exceptionAdapter,
            invalidatesTags: ['product-detail', 'product-list-favorite'],
        }),
        removeProductLike: build.mutation<RemoveLikeProductResponse, string>({
            query: id => ({
                url: `${basePath}/${id}/likes`,
                method: 'DELETE',
            }),
            transformErrorResponse: exceptionAdapter,
            invalidatesTags: ['product-detail', 'product-list-favorite'],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetFavoriteProductsQuery,
    useGetProductByIdQuery,
    useAddProductLikeMutation,
    useRemoveProductLikeMutation,
} = productApi;
