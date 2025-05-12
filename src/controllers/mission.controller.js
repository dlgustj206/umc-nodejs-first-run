import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { addNewMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
    console.log("���Կ� �̼��� �߰��մϴ�!");

    try {
        const storeId = req.params.storeId;
        const {reward, deadline, missionSpec} = req.body;

        if (!storeId || !reward || !deadline || !missionSpec) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "�ʼ� �� ����error1" });
        }

        const missionDTO = bodyToMission(req.body, storeId);
        const missionId = await addNewMission(missionDTO);

        res.status(StatusCodes.CREATED).json({
            message: "�̼��� ���������� �߰��Ǿ����ϴ�!",
            missionId
        })
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};