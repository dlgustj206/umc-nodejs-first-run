export const bodyToMission = (body, storeId) => {
    return {
        store_id: storeId,
        reward: body.reward,
        deadline: body.deadline,
        mission_spec: body.missionSpec
    };
};

export const responseFromMission = (mission) => {
    if (!mission) {
        return null;
    }

    return {
        id: Number(mission.id),    
        reward: mission.reward,
        missionSpec: mission.missionSpec,
        deadline: mission.deadline,
        storeId: mission.storeId ? Number(mission.storeId) : null,
        createdAt: mission.createdAt,
        updatedAt: mission.updatedAt,
    }
}