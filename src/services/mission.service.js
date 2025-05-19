import { responseFromMission } from "../dtos/mission.dto.js";
import { addMission, getMissionById, checkStoreExists, getAllStoreMissions } from "../repositories/mission.repository.js";

export const addNewMission = async (missionData) => {
    const storeExists = await checkStoreExists(missionData.store_id);

    if (!storeExists) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    const missionId = await addMission(missionData);
    const mission = await getMissionById(missionId);

    return responseFromMission(mission);
};

export const listStoreMissions = async (storeId, cursor = 0) => {
    const storeExists = await checkStoreExists(storeId);

    if (!storeExists) {
        throw new Error("존재하지 않는 가게입니다.");
    }

    const missions = await getAllStoreMissions(storeId, cursor);

    return {
        data: missions.map(mission => responseFromMission(mission)),
        pagination: {
            cursor: missions.length ? Number(missions[missions.length - 1].id) : null
        }
    };
};