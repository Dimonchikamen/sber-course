import type { Exception } from '../exception';
import type { User } from '../user';

export type UserSchema = {
    isLoading: boolean;
    user: User | Record<string, never>;
    exception: Exception;
};
