export const bodyToUserMission = (userId, missionId) => {
    return {
        user_id: userId,
        mission_id: missionId,
        status: "?? ?"
    };
};

export const responseFromUserMission = (user_mission) => {
    if (!user_mission) {
        return null;
    }

    return {
        id: user_mission.id,
        userId: user_mission.user_id,
        missionId: user_mission.mission_id,
        status: user_mission.status,
        createdAt: user_mission.created_at,
        updatedAt: user_mission.updated_at,
    };
};