export type AddReviewProductRequest = {
    id: string;
    rating: number;
    text: string;
};

export type RemoveReviewProductRequest = {
    reviewId: string;
    productId: string;
};

export type AverageProductRatingResponse = {
    rating: number;
};
