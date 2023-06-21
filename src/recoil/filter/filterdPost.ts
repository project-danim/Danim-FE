import { atom, selector } from "recoil";

// 필터링 된 게시글 상태
export const filterdPost: any = atom({
  key: "filterdPostState",
  default: [],
});

// 검색한 값인지에 대한 상태
export const isSearchClicked: any = atom({
  key: "isSearchClickedState",
  default: false,
});

// 사용자가 검색한 제목 상태
export const searchedTitleState = atom({
  key: "searchedTitleState",
  default: "",
});

// 사용자가 선택한 필터링 조건 상태
export const filterList = atom<string[]>({
  key: "filterListStateState",
  default: [],
});

// 사용자가 선택한 지역 상태
export const filteredLocation = atom({
  key: "filteredLocationState",
  default: "",
});

// 사용자가 선택한 인원 상태
export const filteredGroupSize = atom({
  key: "filteredGroupSizeState",
  default: "",
});

// 사용자가 선택한 연령대 상태
export const filteredAge = atom<string[]>({
  key: "filteredAgeState",
  default: [],
});

// 사용자가 선택한 모든 검색 조건들 상태
export const allKeywordState: any = atom({
  key: "allKeywordState",
  default: {},
});

// 마감된 게시글을 포함할지에 대한 상태
export const isRecruitmentEndState = atom({
  key: "isRecruitmentEndState",
  default: true,
});

// 필터 키워드 상태 초기화 selector
export const resetFilterState = selector({
  key: "resetFilterState",
  get: () => {}, // get 메서드를 빈 함수로 정의
  set: ({ set }) => {
    // 각 상태를 초기화합니다.
    set(searchedTitleState, "");
    set(filterList, []);
    set(filteredLocation, "");
    set(filteredGroupSize, "");
    set(filteredAge, []);
  },
});
