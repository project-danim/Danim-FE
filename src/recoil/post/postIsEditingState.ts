import { atom } from "recoil";

const postIsEditingState = atom({
  key: "isEditingState",
  default: false,
});

export default postIsEditingState;
