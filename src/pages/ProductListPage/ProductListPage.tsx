import type { FC } from 'react';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Stack } from '@mui/material';

import { ProductCardList, ProductListSearch, WithInfiniteScroll } from '$components';
import { PRODUCT_LIST_PER_PAGE_DEFAULT_VALUE, PRODUCT_LIST_PER_PAGE_PARAM, SEARCH_PRODUCT_PARAM } from '$shared/const';
import { useRtkQuery } from '$shared/hooks';
import { useGetProductsQuery } from '$store';

export const ProductListPage: FC = () => {
    const [searchParams] = useSearchParams();
    const [productPage, setProductPage] = useState(1);

    const searchTerm = searchParams.get(SEARCH_PRODUCT_PARAM) || '';

    const { isLoading, isFetching, data, error, refetch } = useRtkQuery(useGetProductsQuery, {
        searchTerm,
        perPage: Number(searchParams.get(PRODUCT_LIST_PER_PAGE_PARAM) || PRODUCT_LIST_PER_PAGE_DEFAULT_VALUE),
        page: productPage,
    });

    useLayoutEffect(() => {
        setProductPage(1);
    }, [searchTerm]);

    const isEndOfList = data && data.products.length >= data.length;

    const loadMoreProducts = useCallback(() => {
        if (!isEndOfList) {
            setProductPage(prev => prev + 1);
        }
    }, [isEndOfList]);

    return (
        <Stack gap={4} width="100%">
            <ProductListSearch />
            <WithInfiniteScroll isLoading={isFetching} action={loadMoreProducts}>
                <ProductCardList
                    isLoading={isLoading}
                    products={data?.products || []}
                    exception={error}
                    onRepeat={refetch}
                />
            </WithInfiniteScroll>
        </Stack>
    );
};
