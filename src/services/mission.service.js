import { responseFromMission } from "../dtos/mission.dto.js";
import { addMission, getMissionById, checkStoreExists } from "../repositories/mission.repository.js";

export const addNewMission = async (missionData) => {
    const storeExists = await checkStoreExists(missionData.store_id);

    if (!storeExists) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    const missionId = await addMission(missionData);
    const mission = await getMissionById(missionId);

    return responseFromMission(mission);
};