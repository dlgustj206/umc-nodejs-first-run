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

    return !store;
};