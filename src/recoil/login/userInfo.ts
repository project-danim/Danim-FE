import { atom } from "recoil";

// userId 상태
const loginUserIdState = atom({
  key: "userIdState",
  default: "",
});
export default loginUserIdState;
