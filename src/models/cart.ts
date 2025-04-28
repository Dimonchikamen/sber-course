import type { Product } from './product';

export type CartItem = {
    product: Product;
    count: number;
};

export type CartShortItem = {
    id: string;
    count: number;
};
