import type { FC } from 'react';
import { MoodBad } from '@mui/icons-material';
import type { ButtonProps, TypographyProps } from '@mui/material';
import { Button, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface EmptyBlockProps {
    title?: string;
    titleProps?: Omit<TypographyProps, 'children'>;
    description?: string;
    descriptionProps?: Omit<TypographyProps, 'children'>;
    actions?: {
        label: string;
        variant?: ButtonProps['variant'];
        onClick: ButtonProps['onClick'];
    }[];
}

export const EmptyBlock: FC<EmptyBlockProps> = ({
    title = 'Данных нет',
    titleProps,
    description,
    descriptionProps,
    actions = [],
}) => {
    return (
        <Stack sx={{ width: '100%' }} justifyContent="center" alignItems="center">
            <MoodBad sx={{ width: '96px', height: '96px', fill: grey[700] }} />
            <Typography component="h3" variant="h4" {...titleProps}>
                {title}
            </Typography>
            {description && <Typography {...descriptionProps}>{description}</Typography>}
            {actions.length > 0 && (
                <Stack direction="row" justifyContent="center" mt={1}>
                    {actions.map(({ label, variant = 'outlined', onClick }, index) => (
                        <Button key={index} type="button" variant={variant} onClick={onClick}>
                            {label}
                        </Button>
                    ))}
                </Stack>
            )}
        </Stack>
    );
};
