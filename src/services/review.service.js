import { responseFromReview } from "../dtos/review.dto.js";
import { addReview, getReviewById, checkStoreExists } from "../repositories/review.repository.js"

export const addNewReview = async (reviewData) => {
    const storeExists = await checkStoreExists(reviewData.store_id);

    if (!storeExists) {
        throw new Error("�������� �ʴ� �����Դϴ�.");
    }

    if (reviewData.score != null && 
        (reviewData.score < 0 || reviewData.score > 5)) {
        throw new Error("���� ������ 0 ~ 5 ���̿��� �մϴ�.");
    }

    const reviewId = await addReview(reviewData);
    const review = await getReviewById(reviewId);

    return responseFromReview(review);
};