import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addNewStore } from "../services/store.service.js";
import { listStoreReviews } from "../services/store.service.js";
import { listStoreMissions } from "../services/mission.service.js";

export const handleAddStore = async (req, res, next) => {
    console.log("특정 지역에 가게를 추가합니다!");

    try {
        const regionId = req.params.regionId;
        const storeDTO = bodyToStore(req.body, regionId);

        if (!regionId || !storeDTO.name || !storeDTO.address) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "필수 값 누락" });
        }

        const storeId = await addNewStore(storeDTO);
        res.status(StatusCodes.CREATED).json({
            message: "가게가 성공적으로 추가되었습니다!",
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
            message: "가게 리뷰 목록을 성공적으로 조회했습니다!",
            reviews
        });
    } catch (err) {
        next(err);
    }
};

export const handleListStoreMissions = async (req, res, next) => {
    try {
        const storeId = req.params.storeId;
        const cursor = req.query.cursor ? req.query.cursor : 0;

        const missions = await listStoreMissions(storeId, cursor);

        res.status(StatusCodes.OK).json({
            message: "가게 미션 목록을 성공적으로 조회했습니다!",
            missions
        });
    } catch (err) {
        next(err);
    }
};