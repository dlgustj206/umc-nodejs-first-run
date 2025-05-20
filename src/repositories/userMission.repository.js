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
        throw new Error('DB ���� �߻�: ' + err.message);
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
            throw new Error("�������� �ʴ� �̼��Դϴ�");
        }

        return userMission.id;
    } catch (err) {
        throw new Error('���� ���� �̼� ��ȸ ����: ' + err.message);
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
                status: "���� ��",
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
        console.log("Prsima ����: ", err);
        throw new Error("����ڰ� ���� ���� �̼� ��� ��ȸ �� ���� �߻�: ", err.message);
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
        console.log("Prsima ����: ", err);
        throw new Error("�̼� ���� ������Ʈ �� ���� �߻�: ", err.message);
    }
};