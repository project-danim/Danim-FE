import { atom } from "recoil";
import { SelectedMapInfoType } from "../../types/selectedMapInfoType";
import convertDateFormat from "../../utils/convertDateFormat";

// 키워드
export const selectedKeywordState = atom({
  key: "selectedKeywordState",
  default: "",
});

// 모이는 위치
export const selectedLocationState = atom({
  key: "selectedLocationState",
  default: "",
});

// 성별
export const selectedGenderState = atom({
  key: "selectedGenderState",
  default: [] as string[], // 배열의 원소는 문자열라는 것을 명시해줌
});

// 연령대
export const selectedAgeRangeState = atom({
  key: "selectedAgeRangeState",
  default: [] as string[], // 배열의 원소는 문자열라는 것을 명시해줌
});

// 제목
export const PostTitleState = atom({
  key: "PostTitleState",
  default: "",
});

// 모집 시작 날짜 - 글을 쓰는 당일로 고정
export const recruitmentStartDateState = atom<string | null>({
  key: "recruitmentStartDateState",
  default: convertDateFormat(new Date()),
});

// 모집 마감 기한
export const recruitmentEndDateState = atom<string | null>({
  key: "recruitmentEndDateState",
  default: null,
});

// 모집인원 - 항상 2인 이상 10인 이하
export const recruitmentCountState = atom({
  key: "recruitmentCountState",
  default: 1,
});

// 여행 시작 날짜
export const tripStartDateState = atom<string | null>({
  key: "tripStartDateState",
  default: null,
});

// 여행 끝나는 날짜
export const tripEndDateState = atom<string | null>({
  key: "tripEndDateState",
  default: null,
});

// 여행에 관련된 상세 설명 게시글 - type은 import 됨
export const tripPostContentState = atom<string>({
  key: "tripPostContentState", //
  default: "",
});

// 지도 - 장소와 각각의 장소를 방문할 날짜 []
export const selectedInfosState = atom<SelectedMapInfoType[]>({
  key: "selectedInfosState",
  default: [],
});

// 이미지 urls
export const contentsImagesState = atom<string[]>({
  key: "contentsImagesState",
  default: [],
});
