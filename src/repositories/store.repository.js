import { prisma } from "../db.config.js";

export const addStore = async (data) => {
    try {
        const store = await prisma.store.create({
            data: {
                region_id: data.region_id,
                name: data.name,
                address: data.address,
                score: data.score,
                created_at: new Date(),
                updated_at: new Date()
            }
        })
        return store.id;
    } catch (err) {
        throw new Error('DB 오류 발생: ' + err.message);
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
            throw new Error("존재하지 않는 상점입니다.");
        }

        return store.id;
    } catch (err) {
        throw new Error('가게 조회 실패: ' + err.message);
    }
};