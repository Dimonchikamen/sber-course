import type { FC } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import { Badge, Box, IconButton } from '@mui/material';

import { useAppSelector, useRtkQuery } from '$shared/hooks';
import { authRoutePaths } from '$shared/routes';
import { isAuthSelector, useGetCartShortProductListQuery } from '$store';

export const CartIconContainer: FC = () => {
    const isAuth = useAppSelector(isAuthSelector);
    const { data: { count = 0 } = {} } = useRtkQuery(useGetCartShortProductListQuery, undefined, {
        skip: !isAuth,
    });

    const navigate = useNavigate();

    const handleClickFavorite = useCallback(() => navigate(authRoutePaths.cart, { state: true }), []);

    return (
        <Box>
            <Badge color="secondary" invisible={!isAuth || count === 0} badgeContent={count} overlap="circular">
                <IconButton color="inherit" onClick={handleClickFavorite}>
                    <ShoppingCart />
                </IconButton>
            </Badge>
        </Box>
    );
};
