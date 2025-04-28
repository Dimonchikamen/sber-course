import type { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export interface LabelWithTextProps {
    label: string;
    text: string | number;
    direction?: 'column' | 'row';
}

export const LabelWithText: FC<LabelWithTextProps> = ({ label, text, direction = 'column' }) => {
    const alignItems = direction === 'column' ? 'flex-start' : 'center';
    const gap = direction === 'column' ? 0 : 1;

    return (
        <Stack direction={direction} alignItems={alignItems} gap={gap} width="100%">
            <Typography color={grey[500]}>{label}:</Typography>
            <Typography whiteSpace="pre-wrap" width="100%">
                {text}
            </Typography>
        </Stack>
    );
};
