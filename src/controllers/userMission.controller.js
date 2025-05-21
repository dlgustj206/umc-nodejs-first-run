import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/userMission.dto.js";
import { challengeMission, completeUserMission, listProgressionMissions } from "../services/userMission.service.js";

export const handleChallengeMission = async (req, res, next) => {
    /*
    #swagger.summary = '미션 도전 API';
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '미션 ID'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["userId"],
            properties: {
              userId: { type: "integer", example: 5 }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "도전 등록 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "미션 도전이 등록되었습니다!" },
              challengeId: { type: "integer", example: 88 }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "도전 등록 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM001" },
                  reason: { type: "string", example: "userId 또는 missionId 누락" },
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

    console.log("가게의 미션을 도전 중인 미션에 추가합니다!");

    try {
        const missionId = req.params.missionId;
        const userId = req.body.userId;

        if (!missionId || !userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "필수 값 누락"})
        }

        const userMissionDTO = bodyToUserMission(userId, missionId);
        const challengeId = await challengeMission(userMissionDTO);

        res.status(StatusCodes.CREATED).json({
            message: "미션 도전이 등록되었습니다!",
            challengeId
        });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

export const handleListProgressingMissions = async (req, res, next) => {
    /*
    #swagger.summary = '진행 중인 유저 미션 목록 조회 API';
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '유저 ID'
    };
    #swagger.responses[200] = {
      description: "진행 중인 미션 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "사용자가 진행 중인 미션 목록을 성공적으로 조회했습니다!" },
              missions: { type: "array", items: { type: "object" } }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "진행 중인 미션 조회 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM002" },
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
        const cursor = req.query.cursor ? req.query.cursor : 0;

        const missions = await listProgressionMissions(userId, cursor);

        res.status(StatusCodes.OK).json({
            message: "사용자가 진행 중인 미션 목록을 성공적으로 조회했습니다!",
            missions
        });
    } catch (err) {
        next(err);
    }
};

export const handleCompleteUserMission = async (req, res, next) => {
    /*
    #swagger.summary = '유저 미션 완료 처리 API';
    #swagger.parameters['userMissionId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '유저 미션 ID'
    };
    #swagger.responses[200] = {
      description: "미션 완료 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "사용자가 진행 중인 미션을 성공적으로 완료했습니다!" },
              updatedMission: { type: "object" }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 완료 처리 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "UM003" },
                  reason: { type: "string", example: "이미 완료된 미션입니다." },
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
        const userMissionId = req.params.userMissionId;
        const cursor = req.query.cursor ? req.query.cursor : 0;

        const updatedMission = await completeUserMission(userMissionId);

        res.status(StatusCodes.OK).json({
            message: "사용자가 진행 중인 미션을 성공적으로 완료했습니다!",
            updatedMission
        });
    } catch (err) {
        next(err);
    }
};