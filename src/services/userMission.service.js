import { responseFromUserMission } from "../dtos/userMission.dto.js";
import { addUserMission, getAllProgressingMissions, getUserMissionById, isMissionAlreadyChallenged } from "../repositories/userMission.repository.js";

export const challengeMission = async (userMissionData) => {
    const alreadyChallenged = await isMissionAlreadyChallenged(
        userMissionData.user_id,
        userMissionData.mission_id
    );

    if (alreadyChallenged) {
        throw new Error("이미 도전 중인 미션입니다.");
    }

    const userMissionId = await addUserMission(userMissionData);
    const userMission = await getUserMissionById(userMissionId);

    return responseFromUserMission(userMission);
};

export const listProgressionMissions = async (userId, cursor = 0) => {
    const userMissions = await getAllProgressingMissions(userId, cursor);
    return responseFromUserMission(userMissions);
};