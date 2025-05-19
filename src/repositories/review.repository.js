import { prisma } from "../db.config.js";

export const addReview = async (data) => {
    try {
        const review = await prisma.review.create({
            data: {
                user_id: data.user_id,
                store_id: data.store_id,
                body: data.body,
                score: data.score,
                created_at: new Date(),
                updated_at: new Date()
            }
        })
        return review.id;
    } catch (err) {
        throw new Error('DB ���� �߻�: ' + err.message);
    }
};

export const getReviewById = async (reviewId) => {
    try {
        const review = await prisma.review.findUnique({
            where: { id: reviewId },
            include: {
                review_image: true,
                user: true,
                store: true
            }
        })

        if(!review) {
            throw new Error("�������� �ʴ� �����Դϴ�.");
        }

        return review.id;
    } catch (err) {
        throw new Error('���� ��ȸ ����: ' + err.message);
    }
};

export const checkStoreExists = async (storeId) => {
    const store = await prisma.store.findUnique({
        where: { id: storeId },
        select: { id: true }
    })
    return !store;
}

export const getAllStoreReviews = async (storeId) => {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                store_id: parseInt(storeId),
                id: { gt: parseInt(cursor) }
            },
            include: {
                user: true,
                store: true,
                review_image: true
            },
            orderBy: { id: "asc" },
            take: 5
        });

        return reviews;
    } catch (err) {
        console.log("Prsima ����: ", err);
        throw new Error("���� ���� ��ȸ �� ���� �߻�: ", err.message);
    }
}