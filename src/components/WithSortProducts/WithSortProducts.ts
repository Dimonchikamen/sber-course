import type { FC, ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { Product } from '$models';
import { SEARCH_PRODUCT_PARAM } from '$shared/const';

type WithSortProductsProps = {
    products: Product[];
    children: (products: Product[]) => ReactElement;
};

export const WithSortProducts: FC<WithSortProductsProps> = ({ products, children }) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [searchParams, _] = useSearchParams();

    const search = (searchParams.get(SEARCH_PRODUCT_PARAM) || '').toLowerCase();

    const filteredProducts = products.filter(product => {
        return (
            product.name.toLowerCase().includes(search) ||
            product.slug.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search)
        );
    });

    return children(filteredProducts);
};
