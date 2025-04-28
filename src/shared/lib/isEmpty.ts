export const isEmpty = (some: Record<string | number | symbol, unknown> | undefined | null) =>
    !some || Object.keys(some).length === 0;
