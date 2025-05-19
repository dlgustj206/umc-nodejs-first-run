import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addNewStore } from "../services/store.service.js";
import { listStoreReviews } from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
    console.log("Ư�� ������ ���Ը� �߰��մϴ�!");

    try {
        const regionId = req.params.regionId;
        const storeDTO = bodyToStore(req.body, regionId);

        if (!regionId || !storeDTO.name || !storeDTO.address) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "�ʼ� �� ����" });
        }

        const storeId = await addNewStore(storeDTO);
        res.status(StatusCodes.CREATED).json({
            message: "���԰� ���������� �߰��Ǿ����ϴ�!",
            storeId: storeId
        });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};

export const handleListStoreReviews = async (req, res, next) => {
    try {
        const storeId = parseInt(req.params.storeId);
        const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;

        const reviews = await listStoreReviews(storeId, cursor);

        res.status(StatusCodes.OK).json({
            message: "���� ���� ����� ���������� ��ȸ�߽��ϴ�!",
            reviews
        });
    } catch (err) {
        next(err);
    }
};