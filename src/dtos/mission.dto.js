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
        id: mission.id,
        reward: mission.reward,
        missionSpec: mission.mission_spec,
        deadline: mission.deadline,
        storeId: mission.store_id,
        createdAt: mission.created_at,
        updatedAt: mission.updated_at,
    }
}