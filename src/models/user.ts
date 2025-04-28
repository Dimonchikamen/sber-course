import type { FavoritePost } from './favorite';
import type { UserLike } from './like';
import type { AuthResponse } from './rest';
import type { UserRole } from './role';

export type AuthUser = AuthResponse['user'];

export type LikeUser = {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    password: string;
    provider?: null; // ??
    isAdmin: boolean;
    isBlocked: boolean;
    name: string;
    avatarPath: string;
    about: string;
    phone: string;
    roles: UserRole[];
};

export type User = {
    id: string;
    email: string;
    name: string;
    about: string;
    avatarPath: string;
    phone: string;
    roles: UserRole[];
    likes: UserLike[];
    favoritesPost: FavoritePost[];
};
