import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleListUserReviews, handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddStore, handleListStoreMissions } from "./controllers/store.controller.js";
import { handleAddReview } from "./controllers/review.controller.js";
import { handleAddMission } from "./controllers/mission.controller.js";
import { handleChallengeMission, handleListProgressingMissions } from "./controllers/userMission.controller.js";
import { handleListStoreReviews } from "./controllers/store.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                      // cors 방식 허용
app.use(express.static("public"));    // 정적 파일 접근
app.use(express.json());              // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 사용자 관련
app.post("/api/users/signup", handleUserSignUp);
app.get("/api/users/:userId/reviews", handleListUserReviews);

// 지역 및 가게 관련
app.post("/api/regions/:regionId/stores", handleAddStore);

// 리뷰 관련
app.post("/api/stores/:storeId/reviews", handleAddReview);
app.get("/api/store/:storeId/reviews", handleListStoreReviews);

// 미션 관련
app.post("/api/stores/:storeId/missions", handleAddMission);
app.post("/api/missions/:missionId/challenge", handleChallengeMission);
app.get("api/stores/:storeId/missions", handleListStoreMissions);
app.get("api/users/:userId/missions/progressing", handleListProgressingMissions);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});