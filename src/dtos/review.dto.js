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
        userId: review.user_id,
        storeId: review.store_id,
        createdAt: review.created_at,
        updatedAt: review.updated_at,
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
            userId: review.user_id ? Number(review.user_id) : null,
            storeId: review.store_id ? Number(review.store_id) : null,
            createdAt: review.created_at,
            updatedAt: review.updated_at
        })),
        pagination: {
            cursor: reviews.length ? Number(reviews[reviews.length - 1].id) : null
        }
    };
};