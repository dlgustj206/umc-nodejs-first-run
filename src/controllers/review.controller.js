import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addNewReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
    /*
    #swagger.summary = '���� ��� API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '���� ID'
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
              body: { type: "string", example: "���򺣸�!" },
              score: { type: "integer", example: 5 }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "���� ��� ����",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "���䰡 ���������� �߰��Ǿ����ϴ�!" },
              reviewId: { type: "integer", example: 1 }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "���� ��� ����",
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
                  reason: { type: "string", example: "score�� 1~5 ���̿��� �մϴ�" },
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