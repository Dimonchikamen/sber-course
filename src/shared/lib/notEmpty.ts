import { isEmpty } from './isEmpty';

export const notEmpty = (obj: Record<string | number | symbol, unknown> | undefined | null) => !isEmpty(obj);
