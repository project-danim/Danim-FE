import styled from "styled-components";

// 메인 키워드(맛집탐방, 포토스팟 등) 프롭 타입
type UrlProps = "food" | "tour" | "photo" | "hotspot" | "shopping" | string;

// 필터 버튼 프롭 타입
type FilterButtonProps = {
  "data-active": boolean;
  buttonName: string;
  url?: UrlProps;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// 공통 width 스타일
const StyleContainer = styled.div`
  width: 100%;
`;

// 공통 버튼
const CommonButton = styled.button<FilterButtonProps>`
  box-sizing: border-box;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  padding: ${(props) =>
    props.buttonName === "ageButton" ? "0 31px" : "0 12px"};
  background-color: #ffffff;
  background-color: ${(props) =>
    props["data-active"] ? "#2E5902" : "#ffffff"};
  color: ${(props) => (props["data-active"] ? "#ffffff" : "#2E5902")};
  color: ${(props) =>
    props.buttonName === "ageButton" && !props["data-active"]
      ? "#000000"
      : null};
  transition: 0.2s all ease-in-out;
  box-sizing: border-box;
  line-height: ${(props) =>
    props.buttonName === "ageButton" ? "38px" : "40px"};
  border: ${(props) =>
    props.buttonName === "ageButton" ? "1px solid #E4EDC5" : "none"};

  scale: ${(props) => (props["data-active"] ? "1.05" : "1")};

  // 호버시 스타일링
  &:hover {
    cursor: pointer;
    background-color: #2e5902;
    color: #ffffff;
    scale: 1.05;
    &::before {
      background-image: ${(props) => `url(/filterBar/active/${props.url}.svg)`};
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
    height: 24px;
    background-repeat: no-repeat;
    margin-right: 10px;
    position: relative;
    top: 7px;
    ${(props) => props.buttonName === "ageButton" && "display: none;"}
  }
  @media (max-width: 1400px) and (min-width: 320px) {
    font-size: ${(props) =>
      props.buttonName === "ageButton" ? "11px" : "14px"};
    padding: ${(props) =>
      props.buttonName === "ageButton" ? "0 15px" : "0 12px"};
    border-radius: 20px;
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
  @media (max-width: 1400px) and (min-width: 320px) {
    font-size: 12px;
  }
`;

// 공통 드롭다운 버튼
const CommonDropDownButton = styled.button`
  min-width: 286px;
  width: 100%;
  border-radius: 6px;
  padding: 8px;
  line-height: 20px;
  border: 1px solid #e4edc5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
  box-sizing: border-box;
  @media (max-width: 1400px) and (min-width: 320px) {
    min-width: 80px;
  }
`;

// 공통 드롭다운 펼치기 버튼
const CommonUnderButton = styled.div`
  text-indent: -9999px;
  overflow: hidden;
  background-image: url("/filter_underBar.svg");
  width: 20px;
  background-repeat: no-repeat;
`;

// 필터바 컨테이너
const FilterBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 키워드 필터 컨테이너
const KeywordFilterContainer = styled.div`
  background-color: #b5bf69;
  font-weight: 400;
  line-height: 19px;
  border-radius: 30px;
  padding: 10px;
  width: 587px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  position: relative;
  top: 60px;
  @media (max-width: 1400px) and (min-width: 320px) {
    top: 15px;
  }
`;

// 상세 필터 컨테이너
const DetailFilterContainer = styled.div`
  border: 2px solid #eaedd4;
  box-shadow: 0px 1px 2px 0px #00000040;
  display: flex;
  flex-direction: row;
  padding: 48px 96px;
  border-radius: 10px;
  margin-top: 30px;
  margin-bottom: 18px;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 1400px) and (min-width: 320px) {
    padding: 15px 20px;
    margin-top: 7px;
  }
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
  @media (max-width: 1400px) and (min-width: 320px) {
    font-size: 14px;
  }
`;

// 지역과 인원수 컨테이너
const LocationAndSizeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
  gap: 24px;
`;

// 인원수 컨테이너
const GroupSizeContainer = styled.div`
  margin-left: 24px;
  @media (max-width: 1400px) and (min-width: 320px) {
    margin-left: 10px;
  }
`;

// 연령대 컨테이너
const AgeContainer = styled.div`
  padding: 0 12px;
  box-sizing: border-box;
  width: 100%;
  margin-left: 12px;
`;

// 연령대 버튼 컨테이너
const AgeButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 24px;
  @media (max-width: 1400px) and (min-width: 320px) {
    gap: 4px 10px;
  }
`;

export default {
  CommonButton,
  CommonLableNameText,
  CommonDropDownButton,
  CommonUnderButton,
  FilterBarContainer,
  KeywordFilterContainer,
  DetailFilterContainer,
  TitleInput,
  LocationAndSizeContainer,
  GroupSizeContainer,
  AgeContainer,
  AgeButtonContainer,
  StyleContainer,
};
