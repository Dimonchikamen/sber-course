import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

import { ExceptionBlock } from '$components/ExceptionBlock';
import type { Exception, Product } from '$models';
import { useAppSelector } from '$shared/hooks';
import { authUserSelector } from '$store';

import { EmptyBlock } from '../EmptyBlock';
import { ProductCard } from '../ProductCard';

import { ProductCardListSkeleton } from './ProductCardListSkeleton';

import cls from './ProductCardList.module.css';

interface ProductCardListProps {
    isLoading: boolean;
    products: Product[];
    exception?: Exception;
    onRepeat?: VoidFunction;
}

export const ProductCardList: FC<ProductCardListProps> = ({ isLoading, products, exception, onRepeat }) => {
    const { id } = useAppSelector(authUserSelector);

    if (isLoading) {
        return <ProductCardListSkeleton />;
    }

    if (exception) {
        return <ExceptionBlock exception={exception} onRepeat={onRepeat} />;
    }

    if (products.length === 0) {
        return <EmptyBlock />;
    }

    return (
        <Grid container spacing={2} paddingTop={2} paddingBottom={2}>
            {products.map(product => (
                <Grid key={product.id} item xs={3}>
                    <Link className={cls.link} to={product.id} state>
                        <ProductCard
                            key={`${product.id}-item`}
                            product={product}
                            isFavorite={product.likes.some(like => like.userId === id)}
                        />
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};
