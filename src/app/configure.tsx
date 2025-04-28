import { createBrowserRouter, Navigate } from 'react-router-dom';

import {
    CartPage,
    CreateReviewPage,
    FavoriteProductListPage,
    LoginPage,
    NotFoundPage,
    ProductDetailPage,
    ProductListPage,
    ProfilePage,
    RegisterPage,
    ReviewListPage,
} from '$pages';
import { authRoutePaths, publicRoutePaths } from '$shared/routes';

import { AppLayout } from './AppLayout';

export const mainRouter = createBrowserRouter(
    [
        {
            element: <AppLayout />,
            children: [
                {
                    path: publicRoutePaths.default,
                    element: <Navigate to={publicRoutePaths.products} />,
                },

                {
                    path: publicRoutePaths.register,
                    element: <RegisterPage />,
                },
                {
                    path: publicRoutePaths.login,
                    element: <LoginPage />,
                },

                {
                    index: true,
                    path: publicRoutePaths.products,
                    element: <ProductListPage />,
                },
                {
                    path: publicRoutePaths.product_detail,
                    element: <ProductDetailPage />,
                },
                {
                    path: publicRoutePaths.product_reviews,
                    element: <ReviewListPage />,
                },
                {
                    path: authRoutePaths.cart,
                    element: <CartPage />,
                },
                {
                    path: authRoutePaths.favorite_product_list,
                    element: <FavoriteProductListPage />,
                },
                {
                    path: authRoutePaths.product_review_create,
                    element: <CreateReviewPage />,
                },

                {
                    path: authRoutePaths.profile,
                    element: <ProfilePage />,
                },

                {
                    path: publicRoutePaths.not_found,
                    element: <NotFoundPage />,
                },
            ],
        },
    ],
    { basename: __PUBLIC_PATH__ }
);
