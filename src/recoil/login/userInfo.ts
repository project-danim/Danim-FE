import { atom } from "recoil";

// userId 상태
export const userIdState = atom({
  key: "userIdState",
  default: "",
});

// userCookie 상태
export const userCookieState = atom({
  key: "userCookieState",
  default: "",
});
