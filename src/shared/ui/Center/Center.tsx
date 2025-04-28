import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import type { StackProps } from '@mui/material';
import { Stack } from '@mui/material';

interface CenterProps extends Omit<StackProps, 'justifyContent' | 'alightItems' | 'children'> {
    children: ReactNode;
}

export const Center = forwardRef<HTMLDivElement, CenterProps>(
    ({ children, width = '100%', height = '100%', ...props }, ref) => {
        return (
            <Stack
                ref={ref}
                justifyContent="center"
                alignItems="center"
                width={width}
                height={height}
                mt="auto"
                mb="auto"
                {...props}
            >
                {children}
            </Stack>
        );
    }
);
