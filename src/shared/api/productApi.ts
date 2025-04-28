import type { AxiosResponse } from 'axios';

import type {
    CreateProductRequest,
    ExceptionResponse,
    LikeProductResponse,
    Product,
    RemoveLikeProductResponse,
} from '$models';

import { baseApi } from './baseApi';

const basePath = '/products';

export const productApi = {
    getAllProducts: (): Promise<AxiosResponse<{ products: Product[]; length: number } | ExceptionResponse>> =>
        baseApi.get(basePath),
    getProductById: (id: string): Promise<AxiosResponse<Product | ExceptionResponse>> =>
        baseApi.get(`${basePath}/${id}`),
    getProductBySlug: (slug: string): Promise<AxiosResponse<Product | ExceptionResponse>> =>
        baseApi.get(`${basePath}/by-slug/${slug}`),
    createProduct: (addProductData: CreateProductRequest): Promise<AxiosResponse<Product | ExceptionResponse>> =>
        baseApi.post(basePath, addProductData),
    deleteProduct: (productId: string): Promise<AxiosResponse<Product | ExceptionResponse>> =>
        baseApi.delete(`${basePath}/${productId}`),
    addLikeToProduct: (id: string): Promise<AxiosResponse<LikeProductResponse | ExceptionResponse>> =>
        baseApi.put(`${basePath}/${id}/likes`),
    removeLikeFromProduct: (id: string): Promise<AxiosResponse<RemoveLikeProductResponse | ExceptionResponse>> =>
        baseApi.delete(`${basePath}/${id}/likes`),
} as const;
