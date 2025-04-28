import { Skeleton, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';

export const CartProductItemSkeleton = () => {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            border="1px solid"
            borderRadius={3}
            borderColor={grey[300]}
            padding={2}
            gap={2}
        >
            <Stack alignItems="center" direction="row" gap={2} width="100%">
                <Skeleton width={80} height="100%" />
                <Stack gap={1} width="100%">
                    <Skeleton width="100%" height="48px" />
                    <Skeleton width={90} height="36px" />
                </Stack>
            </Stack>
        </Stack>
    );
};
