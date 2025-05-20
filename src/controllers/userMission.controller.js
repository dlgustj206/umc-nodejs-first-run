import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/userMission.dto.js";
import { challengeMission, completeUserMission, listProgressionMissions } from "../services/userMission.service.js";

export const handleChallengeMission = async (req, res, next) => {
    /*
    #swagger.summary = '�̼� ���� API';
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '�̼� ID'
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
      description: "���� ��� ����",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "�̼� ������ ��ϵǾ����ϴ�!" },
              challengeId: { type: "integer", example: 88 }
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
                  errorCode: { type: "string", example: "UM001" },
                  reason: { type: "string", example: "userId �Ǵ� missionId ����" },
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

    console.log("������ �̼��� ���� ���� �̼ǿ� �߰��մϴ�!");

    try {
        const missionId = req.params.missionId;
        const userId = req.body.userId;

        if (!missionId || !userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "�ʼ� �� ����"})
        }

        const userMissionDTO = bodyToUserMission(userId, missionId);
        const challengeId = await challengeMission(userMissionDTO);

        res.status(StatusCodes.CREATED).json({
            message: "�̼� ������ ��ϵǾ����ϴ�!",
            challengeId
        });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

export const handleListProgressingMissions = async (req, res, next) => {
    /*
    #swagger.summary = '���� ���� ���� �̼� ��� ��ȸ API';
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '���� ID'
    };
    #swagger.responses[200] = {
      description: "���� ���� �̼� ��ȸ ����",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "����ڰ� ���� ���� �̼� ����� ���������� ��ȸ�߽��ϴ�!" },
              missions: { type: "array", items: { type: "object" } }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "���� ���� �̼� ��ȸ ����",
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
                  reason: { type: "string", example: "�������� �ʴ� �����Դϴ�." },
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
            message: "����ڰ� ���� ���� �̼� ����� ���������� ��ȸ�߽��ϴ�!",
            missions
        });
    } catch (err) {
        next(err);
    }
};

export const handleCompleteUserMission = async (req, res, next) => {
    /*
    #swagger.summary = '���� �̼� �Ϸ� ó�� API';
    #swagger.parameters['userMissionId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '���� �̼� ID'
    };
    #swagger.responses[200] = {
      description: "�̼� �Ϸ� ����",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "����ڰ� ���� ���� �̼��� ���������� �Ϸ��߽��ϴ�!" },
              updatedMission: { type: "object" }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "�̼� �Ϸ� ó�� ����",
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
                  reason: { type: "string", example: "�̹� �Ϸ�� �̼��Դϴ�." },
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
            message: "����ڰ� ���� ���� �̼��� ���������� �Ϸ��߽��ϴ�!",
            updatedMission
        });
    } catch (err) {
        next(err);
    }
};