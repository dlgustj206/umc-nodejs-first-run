import { prisma } from "../db.config.js";

export const addMission = async (mission) => {
    try {
        const createdMission = await prisma.mission.create({
            data: {
                store: {
                    connect: { id: mission.store_id }
                },
                reward: mission.reward,
                deadline: new Date(mission.deadline),
                missionSpec: mission.mission_spec,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
        return createdMission.id;
    } catch (err) {
        throw new Error('DB 오류 발생: ' + err.message);
    }
};

export const getMissionById = async (missionId) => {
    try {
        const mission = await prisma.mission.findUnique({
            where: { id: missionId },
            include: {
                store: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if(!mission) {
            throw new Error("존재하지 않는 미션입니다.");
        }

        // store_name 필드 추가하여 원래 쿼리 결과와 동일한 구조로 만듦
        return {
            ...mission,
            store_name: mission.store?.name
        };
    } catch (err) {
        throw new Error('미션 조회 실패: ' + err.message);
    }
};

export const checkStoreExists = async (storeId) => {
    const store = await prisma.store.findUnique({
        where: { id: storeId },
        select: { id: true }
    });

    return store;
};

export const getAllStoreMissions = async (storeId, cursor = 0) => {
    try {
        const missions = await prisma.mission.findMany({
            where: {
                store_id: storeId,
                ...(cursor > 0 && { id: { gt: cursor } })
            },
            include: {
                store: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: { created_at: 'desc' },
            take: 5
        });

        return missions.map(mission => ({
            ...mission,
            store_name: mission.store?.name
        }));
    } catch (err) {
        console.log("Prsima 오류: ", err);
        throw new Error("가게 미션 목록 조회 중 오류 발생: ", err.message);
    }
}