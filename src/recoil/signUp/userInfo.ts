import { atom } from "recoil";

// 아이디 입력 값 state
export const signUpUserIdState = atom({
  key: "signUpUserIdState",
  default: "",
});

// 아이디 값 중복 여부 state
export const isUserIdUniqueState = atom({
  key: "isUserIdUniqueState",
  default: false,
});

// 닉네임 입력값 state
export const nicknameState = atom({
  key: "nicknameState",
  default: "",
});

// 닉네임 값 중복 여부 state
export const isNicknameUniqueState = atom({
  key: "isNicknameUniqueState",
  default: false,
});
