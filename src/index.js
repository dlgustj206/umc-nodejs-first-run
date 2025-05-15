/*
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddStore } from "./controllers/store.controller.js";
import { handleAddReview } from "./controllers/review.controller.js";
import { handleAddMission } from "./controllers/mission.controller.js";
import { handleChallengeMission } from "./controllers/userMission.controller.js";

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

// 회원가입
app.post("/api/users/signup", handleUserSignUp);

// 특정 지역에 가게 추가
app.post("/api/regions/:regionId/stores", handleAddStore);

// 가게에 리뷰 추가
app.post("/api/stores/:storeId/reviews", handleAddReview);

// 가게에 미션 추가
app.post("/api/stores/:storeId/missions", handleAddMission);

// 가게의 미션을 도전 중인 미션에 추가
app.post("/api/missions/:missionId/challenge", handleChallengeMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
*/
import express from 'express';

const app = express();
const port = 3000;

const myLogger = (req, res, next) => {
    console.log("LOGGED");

}

app.use(myLogger);

app.get('/', (req, res) => {
    console.log("/");
    res.send('Hello UMC!');
});

app.get('/hello', (req, res) => {
    console.log("/hello");
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});