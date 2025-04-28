export type PostShortInfo = {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    slug: string;
    description: string;
    body: string;
    images: string;
    tags: string[];
    isPublished: boolean;
    favoritesCount: number;
    userId: string;
};
