import type { FC } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Favorite } from '@mui/icons-material';
import { Badge, Box, IconButton } from '@mui/material';

import { useAppSelector } from '$shared/hooks';
import { authRoutePaths } from '$shared/routes';
import { isAuthSelector, userSelector } from '$store';

export const FavoriteProductListBlock: FC = () => {
    const isAuth = useAppSelector(isAuthSelector);
    const {
        user: { likes = [] },
    } = useAppSelector(userSelector);

    const navigate = useNavigate();

    const handleClickFavorite = useCallback(() => navigate(authRoutePaths.favorite_product_list, { state: true }), []);

    return (
        <Box>
            <Badge
                color="secondary"
                invisible={!isAuth || likes.length === 0}
                badgeContent={likes.length}
                overlap="circular"
            >
                <IconButton color="inherit" onClick={handleClickFavorite}>
                    <Favorite />
                </IconButton>
            </Badge>
        </Box>
    );
};
