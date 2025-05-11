import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addNewReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
    console.log("가게에 리뷰를 추가합니다!");

    try {
        const storeId = req.params.storeId;
        const {userId, content, score} = req.body;

        if (!storeId || !userId || !content) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "필수 값 누락error1" });
        }

        const reviewDTO = bodyToReview(req.body, storeId, userId);
        const reviewId = await addNewReview(reviewDTO);

        res.status(StatusCodes.CREATED).json({
            message: "리뷰가 성공적으로 추가되었습니다!",
            reviewId
        })
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};