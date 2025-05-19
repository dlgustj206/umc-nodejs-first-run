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
}