import { prisma } from "../db.config.js";

export const addUserMission = async (data) => {
    try {
        const mission = await prisma.userMission.create({
            data: {
                user_id: data.user_id,
                mission_id: data.mission_id,
                status: data.status,
                created_at: new Date(),
                updated_at: new Date()
            }
        })
        return mission.id;
    } catch (err) {
        throw new Error('DB 오류 발생: ' + err.message);
    }
};

export const getUserMissionById = async (missionId) => {
    try {
        const userMission = await prisma.userMission.findUnique({
            where: { id: missionId },
            include: {
                user: true,
                mission: true
            }
        })

        if(!userMission) {
            throw new Error("존재하지 않는 미션입니다");
        }

        return userMission.id;
    } catch (err) {
        throw new Error('진행 중인 미션 조회 실패: ' + err.message);
    }
};

export const isMissionAlreadyChallenged = async (userId, missionId) => {
    const mission = await prisma.userMission.findUnique({
        where: {
            user_id: userId,
            mission_id: missionid
        },
        select: { id: true }
    });
    return mission;
};

export const getAllProgressingMissions = async (userId, cursor = 0) => {
    try {
        const mission = await prisma.userMission.findMany({
            where: {
                user_id: userId,
                status: "진행 중",
                ...(cursor > 0 && { id: {gt: cursor } })
            },
            include: {
                mission: true,
                store: true
            },
            orderBy: { created_at: 'desc' },
            take: 5
        });

        return mission.map(mission => ({
            ...mission,
            store_name: mission.store?.name
        }));
    } catch (err) {
        console.log("Prsima 오류: ", err);
        throw new Error("사용자가 진행 중인 미션 목록 조회 중 오류 발생: ", err.message);
    }
}