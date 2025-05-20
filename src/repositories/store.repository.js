import { prisma } from "../db.config.js";

export const addStore = async (data) => {
    try {
        const createdStore = await prisma.store.create({
            data: {
                region: {
                    connect: { id: Number(data.region_id) }
                },
                name: data.name,
                address: data.address,
                score: data.score,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
        return createdStore.id;
    } catch (err) {
        throw new Error('DB ���� �߻�: ' + err.message);
    }
};

export const getStoreById = async (storeId) => {
    try {
        const store = await prisma.store.findUnique({
            where: { id: storeId },
            include: {
                region: true
            }
        })

        if(!store) {
            throw new Error("�������� �ʴ� �����Դϴ�.");
        }

        return store.id;
    } catch (err) {
        throw new Error('���� ��ȸ ����: ' + err.message);
    }
};