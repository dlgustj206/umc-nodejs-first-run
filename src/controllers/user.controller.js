import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { listUserReviews } from "../services/review.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

export const handleListUserReviews = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const cursor = req.query.cursor ? req.query : 0;

    const reviews = await listUserReviews(userId, cursor);

    res.status(StatusCodes.OK).json({
      message: "사용자가 작성한 리뷰 목록을 성공적으로 조회했습니다!",
      reviews
    })
  } catch (err) {
    next(err);
  }
};