import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { listUserReviews } from "../services/review.service.js";

export const handleUserSignUp = async (req, res, next) => {
    /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: [
              "email", "name", "gender", "birth",
              "address", "detailAddress", "phoneNumber", "preferences"
            ],
            properties: {
              email: { type: "string", example: "user@example.com" },
              name: { type: "string", example: "봉팔" },
              gender: { type: "string", example: "여자" },
              birth: { type: "string", format: "date", example: "2002-02-06" },
              address: { type: "string", example: "주소1" },
              detailAddress: { type: "string", example: "세부주소1" },
              phoneNumber: { type: "string", example: "010-1234-5678" },
              preferences: {
                type: "array",
                items: { type: "number", example: 1 }
              }
            }
          }
        }
      }
    };

    #swagger.responses[200] = {
      description: "회원 가입 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@example.com" },
                  name: { type: "string", example: "봉팔" },
                  preferCategory: {
                    type: "array",
                    items: { type: "string", example: "한식" }
                  }
                }
              }
            }
          }
        }
      }
    };

    #swagger.responses[400] = {
      description: "회원 가입 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string", example: "이메일 중복" },
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

  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleListUserReviews = async (req, res, next) => {
  /*
    #swagger.summary = '사용자 리뷰 목록 조회 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '사용자 ID'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      type: 'integer',
      description: '페이지네이션 커서'
    };
    #swagger.responses[200] = {
      description: "리뷰 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "사용자가 작성한 리뷰 목록을 성공적으로 조회했습니다!" },
              reviews: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer", example: 1 },
                    body: { type: "string", example: "음식이 줜~나 맛있음!" },
                    score: { type: "integer", example: 5 },
                    createdAt: { type: "string", format: "date-time", example: "2024-03-15T12:00:00Z" }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 조회 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UR001" },
                  reason: { type: "string", example: "존재하지 않는 유저입니다." },
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

  try {
    const userId = req.params.userId;
    const cursor = req.query.cursor ? req.query : 0;

    const reviews = await listUserReviews(userId, cursor);

    res.status(StatusCodes.OK).json({
      message: "사용자가 작성한 리뷰 목록을 성공적으로 조회했습니다!",
      reviews
    })
  } catch (err) {
    next(err);
  }
};