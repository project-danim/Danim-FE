import { atom } from "recoil";

// 채팅 알람에 대한 상태
const hasNewChatState = atom<boolean>({
  key: "hasNewChatState",
  default: false,
});
export default hasNewChatState;
