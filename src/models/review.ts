import type { ProductShortInfo } from './product';
import type { User } from './user';

export type ProductReview = {
    id: string;
    createdAt: string;
    rating: number;
    text: string;
    user: User;
    product: ProductShortInfo;
};
