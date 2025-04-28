import type { ComponentProps, FC } from 'react';

import { useAppSelector } from '$shared/hooks';
import { cartProductCountByIdSelector } from '$store';

import { AddToCartButton } from '../AddToCartButton';
import { ProductCartCounter } from '../ProductCartCounter';

interface ProductCartContainerProps {
    productId: string;
    stock: number;
    counterSize?: ComponentProps<typeof ProductCartCounter>['size'];
    onRemoveLastProductCustomHandler?: (id: string) => void;
}

export const ProductCartContainer: FC<ProductCartContainerProps> = ({
    productId,
    stock,
    counterSize,
    onRemoveLastProductCustomHandler,
}) => {
    const count = useAppSelector(cartProductCountByIdSelector(productId));

    if (count === 0) {
        return <AddToCartButton productId={productId} disabled={stock <= 0} />;
    }

    return (
        <ProductCartCounter
            productId={productId}
            count={count}
            disableAdd={count === stock}
            size={counterSize}
            onRemoveLastProductCustomHandler={onRemoveLastProductCustomHandler}
        />
    );
};
