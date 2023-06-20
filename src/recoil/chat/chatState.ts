import { atom } from "recoil";

// 신청하기, 대화하기 버튼 - room name
export const roomNameState = atom<string>({
  key: "roomNameState",
  default: "",
});

// 신청하기, 대화하기 버튼 - 유저들 이름
export const chatEnteredUsersNicknameState = atom({
  key: "chatEnteredUsersNicknameState",
  default: [],
});

// 신청하기, 대화하기 - 게시글 제목
export const chatRoomChatRecordState = atom({
  key: "chatRoomChatRecordState",
  default: "",
});

// 신청하기, 대화하기 - 게시글 제목
export const chatRoomPostTitleState = atom({
  key: "chatRoomPostTitleState",
  default: "",
});
