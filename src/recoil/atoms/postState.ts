import { atom } from "recoil";

export const selectedKeywordState = atom({
  key: "selectedKeywordState",
  default: "",
});

export const selectedLocationState = atom({
  key: "selectedLocationState",
  default: "",
});
