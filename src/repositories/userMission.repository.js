import { prisma } from "../db.config.js";

export const addUserMission = async (data) => {
    try {
        const mission = await prisma.userMission.create({
            data: {
                user: {
                    connect: { id: Number(data.user_id) }
                },
                mission: {
                    connect: { id: Number(data.mission_id) }
                },
                status: data.status,
                createdAt: new Date(),
                updatedAt: new Date()
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
    const mission = await prisma.userMission.findFirst({
        where: {
            userId: userId,
            missionId: missionId
        },
        select: { id: true }
    });
    return mission;
};

export const getAllProgressingMissions = async (userId, cursor = 0) => {
    try {
        const mission = await prisma.userMission.findMany({
            where: {
                userId: userId,
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
};

export const updateUserMissionStatus = async (userMissionId, newStatus) => {
    try {
        const updated = await prisma.userMission.update({
            where: { id: userMissionId },
            data: { status: newStatus }
        });
        return updated;
    } catch (err) {
        console.log("Prsima 오류: ", err);
        throw new Error("미션 상태 업데이트 중 오류 발생: ", err.message);
    }
};