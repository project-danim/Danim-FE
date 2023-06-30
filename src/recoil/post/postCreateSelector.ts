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
  contentsImagesState,
  PostTitleState,
} from "./postCreateState";

const postCreateState = selector({
  key: "postCreateState",
  // 서버로 보내기 전 변수명을 맞춰줌.
  get: ({ get }) => {
    const postTitle = get(PostTitleState);
    const keyword = get(selectedKeywordState);
    const location = get(selectedLocationState);
    const gender = get(selectedGenderState);
    const ageRange = get(selectedAgeRangeState);
    const recruitmentStartDate = get(recruitmentStartDateState);
    const recruitmentEndDate = get(recruitmentEndDateState);
    const groupSize = get(recruitmentCountState);
    const tripStartDate = get(tripStartDateState);
    const tripEndDate = get(tripEndDateState);
    const content = get(tripPostContentState);
    const MapAPI = get(selectedInfosState);
    const contentsImages = get(contentsImagesState);

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
      content,
      MapAPI,
      contentsImages,
    };
  },
});

export default postCreateState;
