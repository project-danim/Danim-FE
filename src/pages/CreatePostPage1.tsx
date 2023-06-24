import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AgeRange,
  Gender,
  Keywords,
  Location,
  RecruitmentDatePicker,
  TripDatePicker,
  RecruitmentCouter,
  PostTitle,
} from "../components/CreatePostPage1";
import postIsEditingState from "../recoil/post/postIsEditingState";
import * as Styled from "./CreateEditPostPageStyles";
import useResetAllPostStates from "../hooks/useResetAllPostStates";
import {
  PostTitleState,
  recruitmentCountState,
  recruitmentEndDateState,
  recruitmentStartDateState,
  selectedAgeRangeState,
  selectedGenderState,
  selectedKeywordState,
  selectedLocationState,
  tripEndDateState,
  tripStartDateState,
} from "../recoil/post/postCreateState";

function CreatePostPage1() {
  const [, setPostIsEditing] = useRecoilState(postIsEditingState);
  // 컴포넌트가 랜더링 될때 수정 중이 아니도록 하기 위해 postIsEditing 속성을 false로 설정
  useEffect(() => {
    setPostIsEditing(false);
  }, []);

  // 페이지 이동에 따른 recoil state reset
  const resetAllStates = useResetAllPostStates();
  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;

    // "/create-post/step1"에서 다른 페이지로 이동할 때
    if (currentPath === "/create-post/step1") {
      resetAllStates();
    }

    // 다른 페이지에서 "/create-post/step1" 또는 "/create-post/step2"로 이동할 때
    if (
      currentPath !== "/create-post/step1" &&
      currentPath !== "/create-post/step2"
    ) {
      resetAllStates();
    }
  }, [location]); // 페이지가 변경될 때마다 useEffect 실행

  // 입력 유효성 검사를 위햔 상태 값 가져오기
  const selectedKeyword = useRecoilValue(selectedKeywordState);
  const selectedLocation = useRecoilValue(selectedLocationState);
  const selectedGender = useRecoilValue(selectedGenderState);
  const selectedAgeRange = useRecoilValue(selectedAgeRangeState);
  const recoilPostTitle = useRecoilValue(PostTitleState);
  const recruitmentStartDate = useRecoilValue(recruitmentStartDateState);
  const recruitmentEndDate = useRecoilValue(recruitmentEndDateState);
  const recruitmentCount = useRecoilValue(recruitmentCountState);
  const tripStartDate = useRecoilValue(tripStartDateState);
  const tripEndDate = useRecoilValue(tripEndDateState);

  const navigate = useNavigate();

  // 다음 버튼
  const handleNextClick = () => {
    const states = [
      selectedKeyword,
      selectedLocation,
      selectedGender.length,
      selectedAgeRange.length,
      recoilPostTitle,
      recruitmentStartDate,
      recruitmentEndDate,
      recruitmentCount,
      tripStartDate,
      tripEndDate,
    ];

    // 사용자가 값을 입력하지 않은 항목이 있다면 return
    for (let i = 0; i < states.length; i += 1) {
      if (!states[i]) {
        alert("여행을 함께할 사람들을 위한 정보를 작성해 주세요!");
        return;
      }
    }

    navigate("/create-post/step2");
  };

  // 이전 버튼
  const handleBeforeClick = () => {
    navigate("/");
  };

  return (
    <Styled.Container>
      <Styled.VerticalLineStyle />
      <Styled.ContentsContainer>
        <Styled.Wrapper1>
          <Styled.TitleWrapper>
            <Styled.CircleNumbering>1</Styled.CircleNumbering>
            <Styled.MainInfotext>
              메인 페이지에 노출 될 기본 정보를 알려주세요.
            </Styled.MainInfotext>
          </Styled.TitleWrapper>
        </Styled.Wrapper1>

        <Styled.Wrapper1>
          <Styled.SubInfotext>다님의 목적을 알려주세요.</Styled.SubInfotext>
          <Keywords />
        </Styled.Wrapper1>

        <Styled.Wrapper1>
          <Styled.SubInfotext>어디서 함께하시나요?</Styled.SubInfotext>
          <Location />
          <TripDatePicker />
        </Styled.Wrapper1>

        <Styled.Wrapper1>
          <Styled.SubInfotext>
            어떤 사람들과 함께 하시고 싶나요?
            <p>* 중복선택 가능</p>
          </Styled.SubInfotext>
          <Styled.GenderAgeWrapper>
            <Styled.GenderWrapper>
              <Gender />
            </Styled.GenderWrapper>
            <Styled.GenderAgeVerticalLine />
            <Styled.AgeWrapper>
              <AgeRange />
            </Styled.AgeWrapper>
          </Styled.GenderAgeWrapper>
        </Styled.Wrapper1>

        <Styled.Wrapper1>
          <PostTitle />
          <Styled.RecruitmentAndCouterContainer>
            <Styled.RecruitmentAndCouterWrapper>
              <RecruitmentDatePicker />
            </Styled.RecruitmentAndCouterWrapper>
            <Styled.RecruitmentAndCouterWrapper>
              <RecruitmentCouter />
            </Styled.RecruitmentAndCouterWrapper>
          </Styled.RecruitmentAndCouterContainer>
        </Styled.Wrapper1>

        <Styled.ButtonRouterWrapper>
          <Styled.RouterButton onClick={handleBeforeClick}>
            이전
          </Styled.RouterButton>
          <Styled.RouterNextButton onClick={handleNextClick}>
            다음
          </Styled.RouterNextButton>
        </Styled.ButtonRouterWrapper>
      </Styled.ContentsContainer>
    </Styled.Container>
  );
}

export default CreatePostPage1;
