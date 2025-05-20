import { responseFromUserMission } from "../dtos/userMission.dto.js";
import { addUserMission, getAllProgressingMissions, getUserMissionById, isMissionAlreadyChallenged, updateUserMissionStatus } from "../repositories/userMission.repository.js";

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

export const completeUserMission = async (userMissionId) => {
    const mission = await getUserMissionById(userMissionId);

    if(!mission) {
        throw new Error("존재하지 않는 사용자 미션입니다.");
    }

    if(mission.status == "진행 완료") {
        throw new Error("이미 완료된 미션입니다.");
    }

    const updated = await updateUserMissionStatus(userMissionId, "진행 완료");
    return responseFromUserMission(updated);
}