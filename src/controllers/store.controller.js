import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js"
import { addNewStore } from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
    console.log("Ư�� ������ ���Ը� �߰��մϴ�!");

    try {
        const regionId = req.params.regionId;
        const { name, address } = req.body;

        if (!regionId || !name || !address) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "�ʼ� �� ����" });
        }

        const storeId = await addNewStore(bodyToStore(req.body, req.params.regionId));
        res.status(StatusCodes.CREATED).json({
            message: "���԰� ���������� �߰��Ǿ����ϴ�!",
            storeId: storeId
        });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};