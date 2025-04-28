import type { ProductLike } from './like';
import type { ProductReview } from './review';
import type { User } from './user';

export type ProductCategory = {
    id: number;
    name: string;
    slug: string;
};

export type Product = {
    id: string;
    createdAt: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    images: string;
    discount: number;
    stock: number;
    tags: string[];
    isPublished: boolean;
    likes: ProductLike[];
    category?: ProductCategory;
    reviews: ProductReview[];
    user: User;
};

export type ProductShortInfo = Omit<Product, 'likes' | 'category' | 'reviews' | 'user'> & {
    updatedAt: string;
    wight: string;
    categoryId: number;
    userId: string;
};
