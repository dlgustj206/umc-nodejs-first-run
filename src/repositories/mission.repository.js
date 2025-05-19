import { prisma } from "../db.config.js";

export const addMission = async (mission) => {
    try {
        const mission = await prisma.mission.create({
            data: {
                store_id: data.store_id,
                reward: data.reward,
                deadline: new Date(data.deadline),
                mission_spec: data.mission_spec,
                created_at: new Date(),
                updated_at: new Date()
            }
        })
        return mission.id;
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

    return !store;
};