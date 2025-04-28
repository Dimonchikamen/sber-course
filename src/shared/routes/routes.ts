export const publicRoutes = {
    DEFAULT: 'default',

    REGISTER: 'register',
    LOGIN: 'login',

    PRODUCT_LIST: 'products',
    DETAIL_PRODUCT: 'product_detail',
    PRODUCT_REVIEWS: 'product_reviews',

    //errors
    NOT_FOUND: 'not_found',
} as const;

export const authRoutes = {
    PROFILE: 'profile',
    FAVORITE_PRODUCT_LIST: 'favorite_product_list',
    PRODUCT_REVIEW_CREATE: 'product_review_create',
    CART: 'cart',
} as const;
