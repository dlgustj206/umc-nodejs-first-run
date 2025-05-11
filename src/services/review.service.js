import { responseFromReview } from "../dtos/review.dto.js";
import { addReview, getReviewById, checkStoreExists } from "../repositories/review.repository.js"

export const addNewReview = async (reviewData) => {
    const storeExists = await checkStoreExists(reviewData.store_id);

    if (!storeExists) {
        throw new Error("존재하지 않는 가게입니다.error2");
    }

    if (reviewData.score != null && 
        (reviewData.score < 0 || reviewData.score > 5)) {
        throw new Error("리뷰 점수는 0 ~ 5 사이여야 합니다.error3");
    }

    const reviewId = await addReview(reviewData);
    const review = await getReviewById(reviewId);

    return responseFromReview(review);
};