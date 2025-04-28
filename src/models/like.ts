import type { LikeUser } from './user';

export type ProductLike = {
    id: string;
    userId: string;
    productId: string;
    user?: LikeUser;
};

export type UserLike = {
    id: string;
    userId: string;
    productId: string;
};
