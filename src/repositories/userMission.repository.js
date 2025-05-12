import { pool } from "../db.config.js";

export const addUserMission = async (missionData) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await conn.query(
            'INSERT INTO user_mission (user_id, mission_id, status) VALUES (?, ?, ?)',
            [missionData.user_id, missionData.mission_id, missionData.status]
        );
        return result.insertId;
    } catch (err) {
        throw new Error('DB 오류 발생: ' + err.message);
    } finally {
        conn.release();
    }
};

export const getUserMissionById = async (missionId) => {
    const conn = await pool.getConnection();

    try {
        const [userMission] = await pool.query('SELECT * FROM user_mission WHERE id = ?;', [missionId]);
        
        if (missionId.length == 0) {
            return null;
        }

        return userMission[0];
    } catch (err) {
        throw new Error('진행 중인 미션 조회 실패: ' + err.message);
    } finally {
        conn.release();
    }
} 

export const isMissionAlreadyChallenged = async (userId, missionId) => {
    const conn = await pool.getConnection();

    try {
        const [rows] = await conn.query(
            'SELECT id FROM user_mission WHERE user_id =? AND mission_id =?',
            [userId, missionId]
        );
        return rows.length > 0;
    } finally {
        conn.release();
    }
};