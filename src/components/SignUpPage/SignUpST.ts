import styled, { css } from "styled-components";

// 공통 사용 버튼 프롭 타입
type OriginalButtonProps = {
  buttonName?: string;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type FormExplainTextProps = {
  pageName: string;
};

// 공통 사용 버튼
const OriginalButton = styled.button<OriginalButtonProps>`
  padding: 10px 17.5px;
  width: 100%;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  font-family: inherit;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 2px 0px #0000001a;
    cursor: pointer;
    border: 2px solid #eaedd4;
    padding: 8px 15.5px;
  }

  // 중복검사 버튼
  ${({ buttonName }) =>
    buttonName === "checkOverlap" &&
    css`
      background: #b5bf69;
      color: #fff;
      font-weight: 400;
      font-size: 14px;
      padding: 10px 12px;
    `}
  // 그외 다른 버튼
  ${({ buttonName }) =>
    buttonName === "other" &&
    css`
      border-radius: 8px;
      background: #f5f5f5;
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
      color: #fff;
      color: #5c5c5c;
    `}
    // 회원가입 버튼
    ${({ buttonName }) =>
    buttonName === "signUp" &&
    css`
      background-color: #2e5902;
      font-size: 14px;
    `}
    // 연령대, 성별 버튼
    ${({ buttonName }) =>
    (buttonName === "age" || buttonName === "gender") &&
    css`
      color: #5c5c5c;
      padding: 10px 12px;
      &:hover {
        background-color: #e4edc5;
        padding: 10px 12px;
        border: none;
      }
      // 모바일
      @media (max-width: 430px) and (min-width: 375px) {
        font-size: 15px;
      }
    `}
    // 버튼 활성화 시
    ${(props) =>
    props.active &&
    css`
      background-color: #2e5902;
    `}
      // 연령대, 성별 활성화시 
    ${({ active, buttonName }) =>
    active &&
    (buttonName === "age" || buttonName === "gender") &&
    css`
      background-color: #a3bf3b !important;
    `}
`;

// 공통 입력창
const CommonInput = styled.input`
  border: 0.5px solid #a3a3a3;
  font-size: 16px;
  box-sizing: border-box;
  padding: 9.5px 0;
  padding-left: 12px;
  width: 100%;
  line-height: 22px;
  border-radius: 8px;
  font-family: "Pretendard";
  &:focus {
    outline: 1px solid #a3bf3b;
  }
`;

// 공통 입력값 에러 텍스트
const CommonErrorText = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  color: #7ea8e3;
  margin-top: 8px;
  margin-bottom: 32px;
  padding-left: 2px;
  // 모바일
  @media (max-width: 430px) and (min-width: 375px) {
    margin-bottom: 24px;
  }
`;

// 공통 정보 동의 텍스트
const CommonAgreeForInfoText = styled.span`
  font-size: 13px;
`;

// 공통 정보 동의 체크박스
const CommonAgreeForInfoInput = styled.input`
  position: relative;
  top: 2px;
`;

const ContainerForm = styled.form`
  max-width: 360px;
  margin: 0 auto;
  font-size: 14px;
  position: relative;
  color: #868686;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-top: 96px;
  margin-bottom: 144px;
  // 모바일
  @media (max-width: 430px) and (min-width: 375px) {
    margin-top: 40px;
    padding: 0 20px;
  }
`;

// 소셜 로그인 텍스트 ("SNS로 로그인")
const FormExplainText = styled.p<FormExplainTextProps>`
  font-size: 12px;
  text-align: center;
  margin-bottom: 40px;
  margin-top: 56px;
  position: relative;
  &::before {
    content: "";
    width: ${(props) => (props.pageName === "loginPage" ? "108px" : "59px")};
    border: none;
    border-top: 0.5px solid #868686;
    display: block;
    position: absolute;
    top: 6px;
    left: 0;
  }
  &::after {
    content: "";
    width: ${(props) => (props.pageName === "loginPage" ? "108px" : "59px")};
    border: none;
    border-top: 0.5px solid #868686;
    display: block;
    position: absolute;
    top: 6px;
    right: 0;
  }
  // 모바일
  @media (max-width: 430px) and (min-width: 375px) {
    margin-bottom: 30px;
    /* margin-top: ${(props) =>
      props.pageName === "loginPage" ? "44px" : "10px"}; */
    margin-top: 44px;
  }
`;

const SignUpExplainText = styled.p`
  font-family: "Noto Sans KR";
  font-weight: 400;
`;

// 회원가입 정보 입력창 컨테이너
const UserInfoContainer = styled.div`
  margin-top: 36px;
`;

// 아이디
const IdAreaContainer = styled.div`
  display: grid;
  grid-template-columns: calc(75% - 6px) calc(25% - 2px);
  gap: 8px;
  justify-content: space-between;
  align-items: center;
`;

const IdAreaExplainText = styled.p`
  margin: 0;
  margin-bottom: 8px;
  // 모바일
  @media (max-width: 430px) and (min-width: 375px) {
    color: #333;
    font-size: 14px;
    font-weight: 700;
  }
`;

// 성별
const GenderLabelContainer = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
  & > button:first-child {
    margin-right: 20px;
  }
`;

const GenderAriaContainer = styled.div`
  margin-bottom: 32px;
`;

// 연령
const AgeAriaContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  gap: 10px;
`;

// 약관 동의 체크박스 레이블
const AgreeLable = styled.label`
  padding-left: 10px;
`;

// 약관 동의 컨테이너
const AgreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  row-gap: 14px;
  font-size: 14px;
  color: #868686;
  font-family: Noto Sans KR;
  padding: 13px 16px;
  border-radius: 8px;
  border: 0.5px solid #a3a3a3;
  margin-top: 40px;
  margin-bottom: 96px;
  & > label > span {
    font-size: 14px;
  }
`;

export default {
  OriginalButton,
  CommonErrorText,
  CommonAgreeForInfoText,
  CommonAgreeForInfoInput,
  ContainerForm,
  FormExplainText,
  SignUpExplainText,
  UserInfoContainer,
  IdAreaContainer,
  IdAreaExplainText,
  CommonInput,
  GenderLabelContainer,
  GenderAriaContainer,
  AgeAriaContainer,
  AgreeLable,
  AgreeContainer,
};
