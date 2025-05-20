import { responseFromUserMission } from "../dtos/userMission.dto.js";
import { addUserMission, getAllProgressingMissions, getUserMissionById, isMissionAlreadyChallenged, updateUserMissionStatus } from "../repositories/userMission.repository.js";

export const challengeMission = async (userMissionData) => {
    const alreadyChallenged = await isMissionAlreadyChallenged(
        userMissionData.user_id,
        userMissionData.mission_id
    );

    if (alreadyChallenged) {
        throw new Error("�̹� ���� ���� �̼��Դϴ�.");
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
        throw new Error("�������� �ʴ� ����� �̼��Դϴ�.");
    }

    if(mission.status == "���� �Ϸ�") {
        throw new Error("�̹� �Ϸ�� �̼��Դϴ�.");
    }

    const updated = await updateUserMissionStatus(userMissionId, "���� �Ϸ�");
    return responseFromUserMission(updated);
}