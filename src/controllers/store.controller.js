import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addNewStore } from "../services/store.service.js";
import { listStoreReviews } from "../services/store.service.js";
import { listStoreMissions } from "../services/mission.service.js";

export const handleAddStore = async (req, res, next) => {
    /*
    #swagger.summary = '가게 등록 API';
    #swagger.parameters['regionId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '지역 ID'
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name", "address"],
            properties: {
              name: { type: "string", example: "정인면옥" },
              address: { type: "string", example: "서울시 영등포구" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "가게 등록 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "가게가 성공적으로 추가되었습니다!" },
              storeId: { type: "integer", example: 77 }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 등록 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "S001" },
                  reason: { type: "string", example: "regionId 또는 필수 데이터 누락" },
                  data: { type: "object", example: {} }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */

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
    /*
    #swagger.summary = '가게 리뷰 목록 조회 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '가게 ID'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      type: 'integer',
      description: '페이지 커서'
    };
    #swagger.responses[200] = {
      description: "가게 리뷰 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "가게 리뷰 목록을 성공적으로 조회했습니다!" },
              reviews: { type: "array", items: { type: "object" } }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 리뷰 조회 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "SR001" },
                  reason: { type: "string", example: "존재하지 않는 가게 ID입니다." },
                  data: { type: "object", example: {} }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */

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
    /*
    #swagger.summary = '가게 미션 목록 조회 API';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '가게 ID'
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      type: 'integer',
      description: '페이지 커서'
    };
    #swagger.responses[200] = {
      description: "가게 미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "가게 미션 목록을 성공적으로 조회했습니다!" },
              missions: { type: "array", items: { type: "object" } }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 미션 목록 조회 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "SM001" },
                  reason: { type: "string", example: "해당 가게에 대한 미션 정보가 없습니다." },
                  data: { type: "object", example: {} }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    */

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