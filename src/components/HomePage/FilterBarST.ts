import styled from "styled-components";

// 필터 버튼 프롭 타입
type FilterButtonProps = {
  "data-active": boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// 공통 width 스타일
const StyleContainer = styled.div`
  width: 100%;
`;

// 공통 버튼
const CommonButton = styled.button<FilterButtonProps>`
  font-size: 16px;
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
  background-color: #ffffff;
  background-color: ${(props) =>
    props["data-active"] ? "#2E5902" : "#ffffff"};
  color: ${(props) => (props["data-active"] ? "#ffffff" : "#2E5902")};
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1400px) and (min-width: 320px) {
    font-size: 14px;
    border-radius: 20px;
    padding: 6px 10px;
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
    max-width: 470px;
    top: 30px;
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
  @media (max-width: 1400px) and (min-width: 320px) {
    padding: 15px 30px;
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
    max-width: 300px;
    font-size: 14px;
  }
`;

// 지역과 인원수 컨테이너
const LocationAndSizeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

// 인원수 컨테이너
const GroupSizeContainer = styled.div`
  margin-left: 24px;
  @media (max-width: 1400px) and (min-width: 320px) {
    margin-left: 10px;
  }
`;

// 아이디 찾기,비밀번호 찾기, 비밀번호 변경 컨테이너
const FindUserInfoContainer = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-align: center;
  margin-top: 8px;
  color: #868686;
  @media (max-width: 1400px) and (min-width: 320px) {
    font-size: 10px;
  }
`;

// 소셜 회원가입 컨테이너
const SocialLoginContainer = styled.div`
  max-width: 340px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 1400px) and (min-width: 320px) {
    max-width: 240px;
  }
`;

// 소셜 회원가입 버튼
const backgroundColorMap = {
  kakao: "#F7E317",
  naver: "#03BE63",
  google: "#FFFFFF",
};

const colorMap = {
  kakao: "#000000",
  naver: "#FFFFFF",
  google: "#000000",
};

// 소셜 로그인 안내 문구
const SocialExplainText = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  margin-top: 24px;
  @media (max-width: 1400px) and (min-width: 320px) {
    font-size: 10px;
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
  StyleContainer,
  SocialLoginContainer,
  SocialExplainText,
};
