import type { FC } from 'react';
import { Box, Card, CardContent, Skeleton } from '@mui/material';

export const ProductCardSkeleton: FC = () => {
    return (
        <Card sx={{ position: 'relative' }} elevation={4}>
            <Skeleton sx={{ height: 180 }} animation="wave" variant="rectangular" />
            <CardContent>
                <Skeleton animation="wave" height={18} width={40} />
                <Skeleton animation="wave" height={24} width={70} />
                <Skeleton animation="wave" height={18} width={30} />
                <Skeleton animation="wave" height={40} />
            </CardContent>
            <Box sx={{ padding: 2, paddingBottom: 1, paddingTop: 0 }} height={56}>
                <Skeleton component="div" animation="wave" height={56} width={124} />
            </Box>
        </Card>
    );
};
