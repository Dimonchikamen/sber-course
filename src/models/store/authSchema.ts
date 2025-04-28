import type { AuthUser } from '../user';

export type AuthSchema = {
    isAuth: boolean;
    user: AuthUser | Record<string, never>;
};
