import { atom } from "recoil";

// 검색을 통한 마지막 게시글 ref 상태
export const lastRefState: any = atom({
  key: "lastRefState",
  default: undefined,
});

// 검색한 값인지에 대한 상태
export const isSearchClicked: any = atom({
  key: "isSearchClickedStatae",
  default: false,
});
