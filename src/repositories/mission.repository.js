import { pool } from "../db.config.js";

export const addMission = async (mission) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await conn.query(
            'INSERT INTO mission (store_id, reward, deadline, mission_spec) VALUES (?, ?, ?, ?)',
             [mission.store_id, mission.reward, mission.deadline, mission.mission_spec]
        );
        return result.insertId;
    } catch (err) {
        throw new Error('DB 오류 발생: ' + err.message);
    } finally {
        conn.release();
    }
};

export const getMissionById = async (missionId) => {
    const conn = await pool.getConnection();

    try {
        const [mission] = await pool.query('SELECT * FROM mission WHERE id = ?;', [missionId]);

        if (mission.length == 0) {
            return null;
        }

        return mission[0];
    } catch (err) {
        throw new Error('리뷰 조회 실패: ' + err.message);
    } finally {
        conn.release();
    }
};

export const checkStoreExists = async (storeId) => {
    const conn = await pool.getConnection();

    try {
        const [store] = await pool.query('SELECT id FROM store WHERE id = ?', [storeId]);
        return store.length > 0;
    } finally {
        conn.release;
    }
};