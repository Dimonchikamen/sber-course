import { useEffect, useState } from 'react';

export const useDebounce = <Value = unknown>(value: Value, delayMs: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delayMs);

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [delayMs, value]);

    return debouncedValue;
};
