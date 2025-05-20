import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addNewReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
    console.log("���Կ� ���並 �߰��մϴ�!");

    try {
        const storeId = req.params.storeId;
        const {userId, body, score} = req.body;

        if (!storeId || !userId || !body) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "�ʼ� �� ����" });
        }

        if (score < 1 || score > 5) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "score�� 1~5 ���̿��� �մϴ�" });
        }

        const reviewDTO = bodyToReview(req.body, storeId);
        const reviewId = await addNewReview(reviewDTO);

        res.status(StatusCodes.CREATED).json({
            message: "���䰡 ���������� �߰��Ǿ����ϴ�!",
            reviewId
        })
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};