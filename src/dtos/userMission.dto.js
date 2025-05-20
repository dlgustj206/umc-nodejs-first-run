export const bodyToUserMission = (userId, missionId) => {
    return {
        user_id: userId,
        mission_id: missionId,
        status: "진행 중"
    };
};

export const responseFromUserMission = (userMissions) => {
    if (!userMissions) return null;

    return {
        data: userMissions.map(userMission => ({
            id: Number(userMission.id),
            userId: Number(userMission.userId),
            missionId: Number(userMission.missionId),
            status: userMission.status,
            createdAt: userMission.createdAt,
            updatedAt: userMission.updatedAt,
            mission: userMission.mission ? {
                id: Number(userMission.mission.id),
                missionSpec: userMission.mission.missionSpec,
                reward: Number(userMission.mission.reward),
                deadline: userMission.mission.deadline,
                storeId: Number(userMission.mission.storeId),
                storeName: userMission.mission.store?.name || null
            } : null
        })),
        pagination: {
            cursor: userMissions.length ? Number(userMissions[userMissions.length - 1].id) : null
        }
    };
};

/*
export const responseFromUserMissions = (userMissions) => {
    if (!userMissions || userMissions.length === 0) {
        return { data: [], pagination: { cursor: null } };
    }

    return {
        data: userMissions.map(responseFromUserMission),
        pagination: {
            cursor: Number(userMissions[userMissions.length - 1].id)
        }
    };
};
*/