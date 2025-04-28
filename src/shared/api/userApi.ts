import type { AxiosResponse } from 'axios';

import type { ExceptionResponse, User } from '$models';

import { baseApi } from './baseApi';

const basePath = '/users';

export const userApi = {
    getUserByToken: (): Promise<AxiosResponse<User | ExceptionResponse>> => baseApi.get(`${basePath}/me`),
} as const;
