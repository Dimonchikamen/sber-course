import type { Product } from '../product';

export type GetProductListParams = {
    sort?: 'high-price' | 'low-price' | 'newest' | 'oldest';
    searchTerm?: string;
    ratings?: number;
    minPrice?: number;
    maxPrice?: number;
    categoryId?: number;
    perPage?: number;
    page?: number;
};

export type ProductData = {
    products: Product[];
    length: number;
};

export type CreateProductRequest = {
    name: string;
    description: string;
    price: number;
    images: string;
    discount?: number;
    stock: number;
    wight: string;
    tags: string[];
    isPublished: boolean;
    categoryId: number;
};

export type LikeProductResponse = {
    message: string;
    like: {
        id: string;
        userId: string;
        productId: string;
    };
};

export type RemoveLikeProductResponse = {
    message: string;
    product: {
        id: string;
        userId: string;
        productId: string;
    };
};
