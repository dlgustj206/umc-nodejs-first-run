export const bodyToReview = (body, storeId) => {
    return {
        store_id: storeId,
        user_id: body.userId,
        body: body.content,
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