import { atom } from "recoil";

// 신청하기 버튼을 클릭 했을때  - 되돌아온 room name
export const roomNameState = atom<string>({
  key: "roomNameState",
  default: "",
});

// 신청하기 버튼을 클릭 했을때  - 되돌아온 유저들 이름
export const chatEnteredUsersNicknameState = atom({
  key: "chatEnteredUsersNicknameState", // unique ID
  default: [], // default value
});
