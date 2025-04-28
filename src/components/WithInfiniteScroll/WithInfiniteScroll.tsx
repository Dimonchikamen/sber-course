import type { FC, ReactNode } from 'react';
import { useLayoutEffect, useRef } from 'react';
import { CircularProgress, Stack } from '@mui/material';

import { Center } from '$shared/ui';

interface WithInfiniteScrollProps {
    children: ReactNode;
    isLoading?: boolean;
    isEnd?: boolean;
    action: VoidFunction;
}

export const WithInfiniteScroll: FC<WithInfiniteScrollProps> = ({ children, isLoading, isEnd, action }) => {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let observer: IntersectionObserver | null = null;

        if (!isEnd) {
            const callback: IntersectionObserverCallback = entries => {
                if (entries[0]?.isIntersecting) {
                    action();
                }
            };

            if (ref.current) {
                observer = new IntersectionObserver(callback, { threshold: 0.5 });
                observer.observe(ref.current);
            }
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [action, isEnd]);

    return (
        <Stack>
            {children}
            <Center ref={ref} sx={{ my: 3 }}>
                {isLoading && <CircularProgress />}
            </Center>
        </Stack>
    );
};
