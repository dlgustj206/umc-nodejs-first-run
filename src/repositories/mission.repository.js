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
        throw new Error('DB ���� �߻�: ' + err.message);
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
            throw new Error("�������� �ʴ� �̼��Դϴ�.");
        }

        // store_name �ʵ� �߰��Ͽ� ���� ���� ����� ������ ������ ����
        return {
            ...mission,
            store_name: mission.store?.name
        };
    } catch (err) {
        throw new Error('�̼� ��ȸ ����: ' + err.message);
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
        console.log("Prsima ����: ", err);
        throw new Error("���� �̼� ��� ��ȸ �� ���� �߻�: ", err.message);
    }
}