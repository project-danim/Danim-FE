import { useResetRecoilState } from "recoil";
import {
  PostTitleState,
  contentsImagesState,
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
} from "../recoil/post/postCreateState";

// post 들의 state 를 reset 하는 함수
function useResetAllPostStates() {
  // 각 상태에 대한 초기화 함수
  const resetSelectedKeyword = useResetRecoilState(selectedKeywordState);
  const resetSelectedLocation = useResetRecoilState(selectedLocationState);
  const resetSelectedGenderState = useResetRecoilState(selectedGenderState);
  const resetSelectedAgeRangeState = useResetRecoilState(selectedAgeRangeState);
  const resetPostTitleState = useResetRecoilState(PostTitleState);
  const resetRecruitmentStartDateState = useResetRecoilState(
    recruitmentStartDateState
  );
  const resetRrecruitmentEndDateState = useResetRecoilState(
    recruitmentEndDateState
  );
  const resetRecruitmentCountState = useResetRecoilState(recruitmentCountState);
  const resetTripStartDateState = useResetRecoilState(tripStartDateState);
  const resetTripEndDateState = useResetRecoilState(tripEndDateState);
  const resetTripPostContentState = useResetRecoilState(tripPostContentState);
  const resetSelectedInfosState = useResetRecoilState(selectedInfosState);
  const resetContentsImagesState = useResetRecoilState(contentsImagesState);

  const resetAll = () => {
    resetSelectedKeyword();
    resetSelectedLocation();
    resetSelectedGenderState();
    resetSelectedAgeRangeState();
    resetPostTitleState();
    resetRecruitmentStartDateState();
    resetRrecruitmentEndDateState();
    resetRecruitmentCountState();
    resetTripStartDateState();
    resetTripEndDateState();
    resetTripPostContentState();
    resetSelectedInfosState();
    resetContentsImagesState();
  };

  return resetAll;
}

export default useResetAllPostStates;
