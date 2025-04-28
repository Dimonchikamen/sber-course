import type { PostShortInfo } from './post';

export type FavoritePost = {
    id: string;
    userId: string;
    postId: string;
    post: PostShortInfo;
};
