import type { FC } from 'react';

import { ExceptionBlock, ProductCardList, WithProtection } from '$components';
import { useAppSelector, useRtkQuery } from '$shared/hooks';
import { useGetFavoriteProductsQuery, userDataSelector } from '$store';
import { WithBackButton } from '$widgets';

export const FavoriteProductListPage: FC = WithProtection(() => {
    const { id } = useAppSelector(userDataSelector);
    const { isLoading, data = [], error, refetch } = useRtkQuery(useGetFavoriteProductsQuery, id);

    if (error) {
        return <ExceptionBlock exception={error} onRepeat={refetch} />;
    }

    return (
        <WithBackButton>
            <ProductCardList isLoading={isLoading} products={data} exception={error} onRepeat={refetch} />
        </WithBackButton>
    );
});
