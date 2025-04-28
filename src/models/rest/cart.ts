import type { CartItem, CartShortItem } from '../cart';

export type GetCartFullProductListResponse = {
    products: CartItem[];
    count: number;
};

export type GetCartShortProductListResponse = {
    products: CartShortItem[];
    count: number;
};
