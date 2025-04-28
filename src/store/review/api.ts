import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
    AddReviewProductRequest,
    AverageProductRatingResponse,
    ProductReview,
    RemoveReviewProductRequest,
} from '$models';
import { ACCESS_TOKEN_KEY, API_URL } from '$shared/const';
import { exceptionAdapter } from '$shared/lib';

const basePath = '/reviews';

export const reviewApi = createApi({
    reducerPath: 'review/api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: headers => {
            headers.set('authorization', localStorage.getItem(ACCESS_TOKEN_KEY) || '');

            return headers;
        },
    }),
    tagTypes: ['review-list', 'average-rating', 'product-detail'],
    endpoints: build => ({
        getProductReviewList: build.query<ProductReview[], string>({
            query: id => ({
                url: `${basePath}/${id}`,
            }),
            transformErrorResponse: exceptionAdapter,
            providesTags: ['review-list'],
        }),
        addProductReview: build.mutation<ProductReview, AddReviewProductRequest>({
            query: ({ id, ...body }) => ({
                url: `${basePath}/leave/${id}`,
                method: 'POST',
                body,
            }),
            transformErrorResponse: exceptionAdapter,
            invalidatesTags: ['review-list', 'average-rating'],
        }),
        removeProductReview: build.mutation<ProductReview, RemoveReviewProductRequest>({
            query: ({ reviewId }) => ({
                url: `${basePath}/${reviewId}`,
                method: 'DELETE',
            }),
            transformErrorResponse: exceptionAdapter,
            invalidatesTags: ['review-list', 'average-rating'],
        }),
        getAverageProductRating: build.query<number, string>({
            query: id => ({
                url: `${basePath}/average-by-product/${id}`,
            }),
            transformErrorResponse: exceptionAdapter,
            transformResponse: (res: AverageProductRatingResponse) => res.rating,
            providesTags: ['average-rating'],
        }),
    }),
});

export const {
    useGetProductReviewListQuery,
    useAddProductReviewMutation,
    useRemoveProductReviewMutation,
    useGetAverageProductRatingQuery,
} = reviewApi;
