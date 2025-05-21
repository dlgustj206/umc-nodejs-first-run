import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { addNewMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
    /*
    #swagger.summary = '미션 추가 API';
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
            required: ["reward", "deadline", "missionSpec"],
            properties: {
              reward: { type: "integer", example: 1000 },
              deadline: { type: "string", format: "date-time", example: "2025-12-31T23:59:59Z" },
              missionSpec: { type: "string", example: "리뷰 사진 1장과 별점 5점을 남겨주세요." }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 추가 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "미션이 성공적으로 추가되었습니다!" },
              missionId: { type: "integer", example: 42 }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 추가 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
                  reason: { type: "string", example: "필수 값 누락" },
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

    console.log("가게에 미션을 추가합니다!");

    try {
        const storeId = req.params.storeId;
        const {reward, deadline, missionSpec} = req.body;

        if (!storeId || !reward || !deadline || !missionSpec) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "필수 값 누락" });
        }

        const missionDTO = bodyToMission(req.body, storeId);
        const missionId = await addNewMission(missionDTO);

        res.status(StatusCodes.CREATED).json({
            message: "미션이 성공적으로 추가되었습니다!",
            missionId
        })
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};