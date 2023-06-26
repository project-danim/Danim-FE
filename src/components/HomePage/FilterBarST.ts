import styled from "styled-components";

// 메인 키워드(맛집탐방, 포토스팟 등) 프롭 타입
type UrlProps = "food" | "tour" | "photo" | "hotspot" | "shopping" | string;

// 마감된 게시글 포함 여부 토글 버튼 프롭 타입
type IsRecruitEndButtonProps = {
  "data-active": boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// 필터 버튼 프롭 타입
type FilterButtonProps = {
  "data-active": boolean;
  buttonName: string;
  url?: UrlProps;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// 지역, 인원수 ul 프롭 타입
type CommonUlProps = {
  ulName?: string;
};

// 공통 width 스타일
const StyleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// 공통 버튼
const CommonButton = styled.button<FilterButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 16px;
  border-radius: 20px;
  padding: ${(props) =>
    props.buttonName === "ageButton" ? "0px 41.5px" : "0 12px"};
  background-color: #ffffff;
  background-color: ${(props) =>
    props["data-active"] ? "#2E5902" : "#ffffff"};
  color: ${(props) => {
    if (props["data-active"]) {
      return "#ffffff";
    }
    return "#5C5C5C";
  }};
  line-height: ${(props) =>
    props.buttonName === "ageButton" ? "38px" : "40px"};
  border: ${(props) =>
    props.buttonName === "ageButton" ? "1px solid #E4EDC5" : "none"};
  border: ${(props) => (props["data-active"] ? "none" : null)};
  transition: transform 0.2s ease-in-out;
  transform: ${(props) =>
    props["data-active"] && props.buttonName === "keywordButton"
      ? "scale(1.025)"
      : "scale(1)"};
  box-sizing: border-box;
  // 호버시 스타일링
  &:hover {
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #2e5902;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
    /* padding: ${(props) =>
      props.buttonName === "ageButton" ? "0px 41.5px" : "0 10px"}; */
    /* line-height: ${(props) =>
      props.buttonName === "ageButton" ? "36px" : "36px"}; */
    line-height: 36px;
    // 태블릿
    @media (max-width: 1024px) and (min-width: 391px) {
      padding: ${(props) =>
        props.buttonName === "ageButton" ? "0 18px" : "0 10px"};
    }
  }
  // 아이콘 스타일링
  &::before {
    content: "";
    display: inline-block;
    background-image: ${(props) =>
      props["data-active"]
        ? `url(/filterBar/active/${props.url}.svg)`
        : `url(/filterBar/${props.url}.svg)`};
    width: 24px;
    height: 24.5px;
    background-repeat: no-repeat;
    margin-right: 6px;
    position: relative;
    ${(props) => props.buttonName === "ageButton" && "display: none;"}
  }
  // 태블릿
  @media (max-width: 1024px) {
    font-size: 14px;
    padding: ${(props) =>
      props.buttonName === "ageButton" ? "0 18px" : "0 12px"};
  }
  @media (max-width: 650px) and (min-width: 391px) {
    font-size: 12px;
    line-height: ${(props) =>
      props.buttonName === "ageButton" ? "30px" : "36px"};
    padding: ${(props) =>
      props.buttonName === "ageButton" ? "0 5px" : "0 8px"};
  }
  // 모바일
  @media (max-width: 390px) {
    padding: ${(props) =>
      props.buttonName === "ageButton" ? "0 18px" : "0 12px"};
  }
`;

// 공통 레이블 텍스트
const CommonLableNameText = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  text-align: left;
  color: #858585;
  margin-bottom: 0px;
  margin-top: 0;
`;

// 공통 드롭다운 버튼
const CommonDropDownButton = styled.button`
  min-width: 286px;
  width: 100%;
  border-radius: 6px;
  padding: 8px;
  padding-left: 16px;
  line-height: 20px;
  border: 1px solid #e4edc5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
  box-sizing: border-box;
  font-size: 16px;
  position: relative;
  color: #5c5c5c;
  // 태블릿
  @media (max-width: 1200px) and (min-width: 840px) {
    min-width: 220px;
  }
  @media (max-width: 839px) {
    min-width: 140px;
  }
  @media (max-width: 650px) and (min-width: 391px) {
    font-size: 12px;
  }
  @media (max-width: 650px) and (min-width: 391px) {
    min-width: 100px;
  }
`;

// 공통 드롭다운 펼치기 버튼
const CommonUnderButton = styled.div`
  text-indent: -9999px;
  overflow: hidden;
  background-image: url("/filter_underBar.svg");
  width: 20px;
  background-repeat: no-repeat;
  font-family: inherit;
`;

// 공통 드롭다운으로 선택된 값
const CommonSelectedValue = styled.div`
  // 태블릿
  @media (max-width: 1024px) and (min-width: 391px) {
    font-size: 14px;
  }
  @media (max-width: 650px) and (min-width: 391px) {
    font-size: 12px;
  }
  // 모바일
  @media (max-width: 390px) {
  }
`;

// 필터바 컨테이너
const FilterBarContainer = styled.div`
  flex-direction: column;
  align-items: center;
  margin-top: 89px;
  border-radius: 10px;
  border: 2px solid #e4edc5;
  display: inline-flex;
  padding: 22px 95px 32px 95px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;
  position: relative;
  // 태블릿
  @media (max-width: 1024px) and (min-width: 391px) {
    padding: 0 20px;
  }
  // 모바일
  @media (max-width: 390px) {
  }
`;

// 키워드 필터 컨테이너
const KeywordFilterContainer = styled.div`
  background-color: #b5bf69;
  font-weight: 400;
  line-height: 19px;
  border-radius: 30px;
  padding: 10px;
  max-width: 550px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  position: absolute;
  top: -30px;
  z-index: 1;
`;

// 모집 마감 토글 버튼 컨테이너
const RecruitEndContainer = styled.div`
  width: 100%;
  position: relative;
`;

// 모집 마감 토글 버튼
const IsRecruitButton = styled.button<IsRecruitEndButtonProps>`
  font-family: inherit;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  color: #5c5c5c;
  padding: 5px;
  border: 1px solid #b5bf69;
  width: 71px;
  border-radius: 30px;
  text-indent: -57px;
  display: flex;
  align-items: center;
  position: absolute;
  background-color: ${(props) =>
    props["data-active"] ? "#FFFFFF" : "#E6E6E6"};
  right: 0;
  cursor: pointer;

  &::after {
    content: "";
    display: inline-block;
    position: relative;
    left: ${(props) => (props["data-active"] ? "34px" : "0px")};
    animation-name: ${(props) =>
      props["data-active"] ? "move-right" : "move-left"};
    animation-duration: 0.2s;
    animation-timing-function: linear;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${(props) =>
      props["data-active"] ? "#b5bf69" : "#2E5902"};
  }
  @media (max-width: 1024px) and (min-width: 391px) {
    right: 38px;
  }

  @keyframes move-left {
    0% {
      left: 34px;
    }
    50% {
      left: 15px;
    }
    100% {
      left: 0;
    }
  }
  @keyframes move-right {
    0% {
      left: 0;
    }
    100% {
      left: 34px;
    }
  }
`;

// 연령대,제목,지역,인원수 컨테이너
const MainKeywordContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 24px;
  gap: 24px;
`;

// 연령대와 제목 컨테이너
const AgeAndTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

// 제목 검색창
const TitleInput = styled.input`
  padding: 8px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  border: 1px solid #e4edc5;
  border-radius: 6px;
  max-width: 596px;
  width: 100%;
  color: #5c5c5c;
  &:focus {
    outline: 1px solid #a3bf3b;
  }
  // 태블릿
  @media (max-width: 839px) and (min-width: 391px) {
    font-size: 12px;
  }
`;

// 연령대 컨테이너
const AgeContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

// 연령대 버튼 컨테이너
const AgeButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4px;
  // 태블릿
  @media (max-width: 1024px) and (min-width: 840px) {
    gap: 4px 10px;
  }
  @media (max-width: 839px) {
    gap: 4px 4px;
  }
  // 모바일
  @media (max-width: 390px) {
  }
`;

// 지역과 인원수 컨테이너
const LocationAndGroupSizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
`;

// 지역 리스트 ul
const LocationListUl = styled.ul<CommonUlProps>`
  overflow: visible;
  height: 100px;
  position: absolute;
  top: ${({ ulName }) => (ulName === "location" ? "129px" : "218px")};
  width: 286px;
  box-sizing: border-box;
  color: #5c5c5c;
  & > div {
    z-index: 1;
    position: relative;
    padding: 8px 16px;
    border-left: 1px solid #e4edc4;
    border-right: 1px solid #e4edc4;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
    cursor: pointer;
  }
  & > div:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  }
  // 태블릿
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 650px) and (min-width: 391px) {
    font-size: 12px;
  }
`;

export default {
  CommonButton,
  CommonLableNameText,
  CommonDropDownButton,
  CommonUnderButton,
  CommonSelectedValue,
  FilterBarContainer,
  KeywordFilterContainer,
  IsRecruitButton,
  RecruitEndContainer,
  MainKeywordContainer,
  AgeAndTitleContainer,
  TitleInput,
  LocationListUl,
  AgeContainer,
  AgeButtonContainer,
  LocationAndGroupSizeContainer,
  StyleContainer,
};
