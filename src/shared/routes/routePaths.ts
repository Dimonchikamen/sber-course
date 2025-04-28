import { authRoutes, publicRoutes } from './routes';

export const authRoutePaths: Record<ValueOf<typeof authRoutes>, string> = {
    [authRoutes.PROFILE]: '/profile',
    [authRoutes.FAVORITE_PRODUCT_LIST]: '/products/favorite',
    [authRoutes.PRODUCT_REVIEW_CREATE]: '/products/:productId/reviews/create',
    [authRoutes.CART]: '/cart',
} as const;

export const publicRoutePaths: Record<ValueOf<typeof publicRoutes>, string> = {
    [publicRoutes.DEFAULT]: '/',

    [publicRoutes.REGISTER]: '/register',
    [publicRoutes.LOGIN]: '/login',

    [publicRoutes.PRODUCT_LIST]: '/products',
    [publicRoutes.DETAIL_PRODUCT]: '/products/:productId',
    [publicRoutes.PRODUCT_REVIEWS]: '/products/:productId/reviews',

    [publicRoutes.NOT_FOUND]: '*',
} as const;
