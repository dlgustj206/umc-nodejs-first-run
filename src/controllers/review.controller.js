import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addNewReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
    /*
    #swagger.summary = '리뷰 등록 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '가게 ID'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["userId", "body", "score"],
            properties: {
              userId: { type: "integer", example: 1 },
              body: { type: "string", example: "왕츄베릅!" },
              score: { type: "integer", example: 5 }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "리뷰 등록 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "리뷰가 성공적으로 추가되었습니다!" },
              reviewId: { type: "integer", example: 1 }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 등록 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "R001" },
                  reason: { type: "string", example: "score는 1~5 사이여야 합니다" },
                  data: { type: "object", example: {} }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */

    console.log("가게에 리뷰를 추가합니다!");

    try {
        const storeId = req.params.storeId;
        const {userId, body, score} = req.body;

        if (!storeId || !userId || !body) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "필수 값 누락" });
        }

        if (score < 1 || score > 5) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "score는 1~5 사이여야 합니다" });
        }

        const reviewDTO = bodyToReview(req.body, storeId);
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