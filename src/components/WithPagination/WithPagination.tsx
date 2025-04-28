import type { ChangeEvent, ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { Pagination, Stack } from '@mui/material';

type WithPaginationProps<TElement> = {
    elements: TElement[];
    elementsCount: number;
    elementsByPage: number;
    children: (elements: TElement[]) => ReactElement;
};

export const WithPagination = <TElement,>({
    elements,
    elementsCount,
    elementsByPage,
    children,
}: WithPaginationProps<TElement>) => {
    const [currentPage, setCurrentPage] = useState(1);

    const maxPages = Math.ceil(elementsCount / elementsByPage);
    const elementsInPage = elements.slice((currentPage - 1) * elementsByPage, currentPage * elementsByPage);

    const handleChangePage = (_: ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        if (maxPages < currentPage) {
            setCurrentPage(maxPages);
        }
    }, [elementsCount]);

    return (
        <Stack alignItems="center" width="100%">
            {children(elementsInPage)}
            <Pagination page={currentPage} count={maxPages} size="large" onChange={handleChangePage} />
        </Stack>
    );
};
