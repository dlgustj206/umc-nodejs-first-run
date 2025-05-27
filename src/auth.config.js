import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: "추후 수정",
      birth: new Date(2002, 1, 1),
      age: new Date().getFullYear() - birth.getFullYear(),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
      socialType: "google",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

export const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/kakao",
  },
  (accessToken, refreshToken, profile, cb) => {
    return kakaoVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const kakaoVerify = async (profile) => {
  const email = profile._json.kakao_account.email;
  const nickname = profile._json?.kakao_account?.profile?.nickname || "미연동 계정";
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const birth = new Date(2002, 1, 1);
  const age = new Date().getFullYear() - birth.getFullYear();

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.username,
      gender: "추후 수정",
      birth,
      age,
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
      socialType: "kakao",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};