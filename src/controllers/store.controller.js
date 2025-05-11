import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js"
import { addNewStore } from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
    console.log("특정 지역에 가게를 추가합니다!");

    try {
        const regionId = req.params.regionId;
        const { name, address } = req.body;

        if (!regionId || !name || !address) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "필수 값 누락" });
        }

        const storeId = await addNewStore(bodyToStore(req.body, req.params.regionId));
        res.status(StatusCodes.CREATED).json({
            message: "가게가 성공적으로 추가되었습니다!",
            storeId: storeId
        });
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};