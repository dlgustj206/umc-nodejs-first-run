import { pool } from "../db.config.js";

export const addReview = async (review) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await conn.query(
            'INSERT INTO review (user_id, store_id, body, score) VALUES (?, ?, ?, ?)',
            [review.user_id, review.store_id, review.body, review.score]
        );
        return result.insertId;
    } catch (err) {
        throw new Error('DB 오류 발생: ' + err.message);
    } finally {
        conn.release();
    }
};

export const getReviewById = async (reviewId) => {
    const conn = await pool.getConnection();

    try {
        const [review] = await pool.query('SELECT * FROM review WHERE id = ?;', [reviewId]);

        if (review.length == 0) {
            return null;
        }

        return review[0];
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
}