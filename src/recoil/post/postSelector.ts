import { selector } from "recoil";
import {
  recruitmentCountState,
  recruitmentEndDateState,
  recruitmentStartDateState,
  selectedAgeRangeState,
  selectedGenderState,
  selectedInfosState,
  selectedKeywordState,
  selectedLocationState,
  tripEndDateState,
  tripPostContentState,
  tripStartDateState,
} from "./postState";

// export default selector({
export const postState = selector({
  key: "postState",
  // 서버로 보내기 전 변수명을 맞춰줌.
  get: ({ get }) => {
    const postTitle = "제목입니다";
    const keyword = get(selectedKeywordState);
    const location = get(selectedLocationState);
    const gender = get(selectedGenderState);
    const ageRange = get(selectedAgeRangeState);
    const recruitmentStartDate = get(recruitmentStartDateState);
    const recruitmentEndDate = get(recruitmentEndDateState);
    const groupSize = get(recruitmentCountState);
    const tripStartDate = get(tripStartDateState);
    const tripEndDate = get(tripEndDateState);
    const contents = get(tripPostContentState);
    const MapAPI = get(selectedInfosState);

    return {
      postTitle,
      recruitmentStartDate,
      recruitmentEndDate,
      tripStartDate,
      tripEndDate,
      groupSize,
      ageRange,
      location,
      gender,
      keyword,
      contents,
      MapAPI,
    };
  },
});
