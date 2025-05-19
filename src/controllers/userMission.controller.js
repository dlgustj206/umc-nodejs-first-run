import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/userMission.dto.js";
import { challengeMission, listProgressionMissions } from "../services/userMission.service.js";

export const handleChallengeMission = async (req, res, next) => {
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