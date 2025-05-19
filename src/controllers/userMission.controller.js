import { StatusCodes } from "http-status-codes";
import { bodyToUserMission } from "../dtos/userMission.dto.js";
import { challengeMission, listProgressionMissions } from "../services/userMission.service.js";

export const handleChallengeMission = async (req, res, next) => {
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