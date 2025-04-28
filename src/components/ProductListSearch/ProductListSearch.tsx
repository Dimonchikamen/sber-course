import type { ChangeEvent, FC, FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Clear, Search } from '@mui/icons-material';
import { Box, FilledInput, IconButton, InputAdornment } from '@mui/material';

import { SEARCH_PRODUCT_PARAM } from '$shared/const';
import { useDebounce } from '$shared/hooks';

export const ProductListSearch: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState('');

    const debouncedValue = useDebounce(value, 500);

    const searchParam = searchParams.get(SEARCH_PRODUCT_PARAM);

    const handleSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        setSearchParams(prev => {
            prev.set(SEARCH_PRODUCT_PARAM, value);

            return prev;
        });
    };

    const handleClear = useCallback(() => {
        setValue('');
        setSearchParams(prev => {
            prev.delete(SEARCH_PRODUCT_PARAM);

            return prev;
        });
    }, []);

    const handleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => setValue(ev.target.value), []);

    useEffect(() => {
        setValue(searchParam || '');
    }, [searchParam]);

    useEffect(() => {
        setSearchParams(prev => {
            prev.set(SEARCH_PRODUCT_PARAM, debouncedValue);

            return prev;
        });
    }, [debouncedValue]);

    const clearInputButton = useMemo(
        () => (
            <InputAdornment position="end">
                <IconButton onClick={handleClear}>
                    <Clear />
                </IconButton>
            </InputAdornment>
        ),
        []
    );

    return (
        <Box width="100%" component="form" onSubmit={handleSubmit}>
            <FilledInput
                inputProps={{
                    style: { paddingTop: 8 },
                }}
                placeholder="Найти товар..."
                value={value}
                fullWidth
                startAdornment={
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                }
                endAdornment={!!value && clearInputButton}
                onChange={handleChange}
            />
        </Box>
    );
};
