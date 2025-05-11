import { pool } from "../db.config.js";

export const addStore = async (store) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await pool.query(
            'INSERT INTO store (name, address, region_id) VALUES (?, ?, ?)',
            [store.name, store.address, store.region_id]
        );
        return result.insertId;
    } catch (err) {
        throw new Error('DB 오류 발생: ' + err.message);
    } finally {
        conn.release();
    }
};

export const getStoreById = async (storeId) => {
    const conn = await pool.getConnection();

    try {
        const [store] = await pool.query('SELECT * FROM store WHERE id = ?;', [storeId]);

        if (store.length == 0) {
            return null;
        }

        return store[0];
    } catch (err) {
        throw new Error('가게 조회 실패: ' + err.message);
    } finally {
        conn.release();
    }
};