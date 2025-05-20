import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { addNewMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
    /*
    #swagger.summary = '�̼� �߰� API';
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
            required: ["reward", "deadline", "missionSpec"],
            properties: {
              reward: { type: "integer", example: 1000 },
              deadline: { type: "string", format: "date-time", example: "2025-12-31T23:59:59Z" },
              missionSpec: { type: "string", example: "���� ���� 1��� ���� 5���� �����ּ���." }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "�̼� �߰� ����",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "�̼��� ���������� �߰��Ǿ����ϴ�!" },
              missionId: { type: "integer", example: 42 }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "�̼� �߰� ����",
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
                  reason: { type: "string", example: "�ʼ� �� ����" },
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

    console.log("���Կ� �̼��� �߰��մϴ�!");

    try {
        const storeId = req.params.storeId;
        const {reward, deadline, missionSpec} = req.body;

        if (!storeId || !reward || !deadline || !missionSpec) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "�ʼ� �� ����" });
        }

        const missionDTO = bodyToMission(req.body, storeId);
        const missionId = await addNewMission(missionDTO);

        res.status(StatusCodes.CREATED).json({
            message: "�̼��� ���������� �߰��Ǿ����ϴ�!",
            missionId
        })
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};