import type { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { red } from '@mui/material/colors';

import { getPriceText, getPriceWithDiscount } from '$shared/lib';

interface PriceWithDiscountProps {
    price: number;
    discount: number;
    typography?: '14_18' | '20_24' | '24_28' | '28_32';
    enableFullPricePadding?: boolean;
}

const typographyValues: NonNullable<PriceWithDiscountProps['typography']>[] = ['14_18', '20_24', '24_28', '28_32'];

const getFontSizeAndLineHeight = (typography: NonNullable<PriceWithDiscountProps['typography']>) => {
    const [fontSize, lineHeight] = typography.split('_').map(value => `${value}px`);

    return {
        fontSize,
        lineHeight,
    };
};

export const PriceWithDiscount: FC<PriceWithDiscountProps> = ({
    price,
    discount,
    typography = '20_24',
    enableFullPricePadding = true,
}) => {
    const isDiscounted = discount > 0;
    const currentPrice = getPriceWithDiscount(price, discount);
    const discountSizes = getFontSizeAndLineHeight(
        typographyValues[Math.max(typographyValues.findIndex(typ => typ === typography) - 1, 0)]
    );
    const costSizes = getFontSizeAndLineHeight(typography);
    const maxPaddingTop = enableFullPricePadding ? '18px' : 0;

    return (
        <Box sx={{ paddingTop: isDiscounted ? 0 : maxPaddingTop }}>
            {isDiscounted && (
                <Typography
                    fontSize={discountSizes.fontSize}
                    lineHeight={discountSizes.lineHeight}
                    sx={{ textDecoration: 'line-through' }}
                >
                    {getPriceText(price)}
                </Typography>
            )}
            <Typography
                color={isDiscounted ? red[500] : 'default'}
                fontSize={costSizes.fontSize}
                lineHeight={costSizes.lineHeight}
                fontWeight="bold"
            >
                {getPriceText(currentPrice)}
            </Typography>
        </Box>
    );
};
