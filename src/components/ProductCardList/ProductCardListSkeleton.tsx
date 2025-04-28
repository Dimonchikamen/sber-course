import type { FC } from 'react';
import { Grid } from '@mui/material';

import { ProductCardSkeleton } from '$components/ProductCard';

const arrayForSkeletons = [0, 0, 0, 0, 0, 0, 0, 0];

export const ProductCardListSkeleton: FC = () => (
    <Grid container spacing={2} paddingTop={2} paddingBottom={2}>
        {arrayForSkeletons.map((_, index) => (
            <Grid key={index} item xs={3}>
                <ProductCardSkeleton />
            </Grid>
        ))}
    </Grid>
);
