import { responseFromMission } from "../dtos/mission.dto.js";
import { addMission, getMissionById, checkStoreExists } from "../repositories/mission.repository.js";

export const addNewMission = async (missionData) => {
    const storeExists = await checkStoreExists(missionData.store_id);

    if (!storeExists) {
        throw new Error("�������� �ʴ� �����Դϴ�.");
    }

    const missionId = await addMission(missionData);
    const mission = await getMissionById(missionId);

    return responseFromMission(mission);
};