import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { AuthResponse, LoginData, RegisterData } from '$models';
import { API_URL } from '$shared/const';
import { exceptionAdapter } from '$shared/lib';

const basePath = '/auth';

export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: build => ({
        login: build.mutation<AuthResponse, LoginData>({
            query: payload => ({
                url: `${basePath}/login`,
                method: 'POST',
                body: payload,
            }),
            transformErrorResponse: exceptionAdapter,
        }),
        register: build.mutation<AuthResponse, RegisterData>({
            query: payload => ({
                url: `${basePath}/register`,
                method: 'POST',
                body: payload,
            }),
            transformErrorResponse: exceptionAdapter,
        }),
        refresh: build.mutation<AuthResponse, undefined>({
            query: () => ({
                url: `${basePath}/refresh-tokens`,
                method: 'POST',
            }),
            transformErrorResponse: exceptionAdapter,
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
