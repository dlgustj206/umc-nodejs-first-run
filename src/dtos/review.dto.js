export const bodyToReview = (body, storeId) => {
    return {
        store_id: storeId,
        user_id: body.userId,
        body: body.body,
        score: body.score
    };
};

export const responseFromReview = (review) => {
    if (!review) {
        return null;
    }

    return {
        id: review.id,
        body: review.body,
        score: review.score,
        userId: review.userId,
        storeId: review.storeId,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
    };
};

export const responseFromReviews = (reviews) => {
    if (!reviews) {
        return null;
    }

    return {
        data: reviews.map(review => ({
            id: Number(review.id),
            body: review.body,
            score: review.score,
            userId: review.userId ? Number(review.userId) : null,
            storeId: review.storeId ? Number(review.storeId) : null,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt
        })),
        pagination: {
            cursor: reviews.length ? Number(reviews[reviews.length - 1].id) : null
        }
    };
};