import styled from "styled-components";

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
  font-size: 14px;
  line-height: 22px;
  padding: 10px 17.5px;
  width: 100%;
  color: #ffffff;
  background-color: ${({ buttonName }) =>
    buttonName === "signUp" ? "#2E5902" : "#A3BF3B"};
  background-color: ${(props) => (props.active ? "#2E5902" : "#a3bf3b")};
  border: none;
  border-radius: 8px;
  font-weight: 400;
  font-family: "Pretendard-Regular";
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 2px 0px #0000001a;
    cursor: pointer;
    border: 2px solid #eaedd4;
    padding: 8px 15.5px;
  }
  @media (max-width: 1400px) and (min-width: 320px) {
    font-size: 12px;
    height: 32px;
    padding: 0 13px;
  }
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
  font-family: "Pretendard-Regular";
  &:focus {
    outline: 1px solid #a3bf3b;
  }
  @media (max-width: 1400px) and (min-width: 320px) {
    font-size: 11px;
    padding: 8px 0;
    padding-left: 8px;
    line-height: 15px;
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
  @media (max-width: 1400px) and (min-width: 320px) {
    font-size: 10px;
  }
`;

// 공통 정보 동의 텍스트
const CommonAgreeForInfoText = styled.span`
  font-size: 13px;
  @media (max-width: 1400px) and (min-width: 320px) {
    font-size: 10px;
  }
`;

// 공통 정보 동의 체크박스
const CommonAgreeForInfoInput = styled.input`
  position: relative;
  top: 2px;
  @media (max-width: 1400px) and (min-width: 320px) {
    top: 3px;
  }
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
  margin-top: 106px;
  margin-bottom: 144px;
  @media (max-width: 1400px) and (min-width: 320px) {
    font-size: 10px;
    max-width: 270px;
  }
`;

// 소셜 로그인 텍스트 ("SNS로 로그인")
const FormExplainText = styled.p<FormExplainTextProps>`
  font-size: 12px;
  text-align: center;
  margin-bottom: ${(props) =>
    props.pageName === "loginPage" ? "56px" : "36px"};
  margin-top: ${(props) => (props.pageName === "loginPage" ? "56px" : "0")};
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
  @media (max-width: 1400px) and (min-width: 320px) {
    font-size: 10px;
    &::before {
      width: ${(props) => (props.pageName === "loginPage" ? "80px" : "40px")};
      top: 5px;
    }
    &::after {
      width: ${(props) => (props.pageName === "loginPage" ? "80px" : "40px")};
      top: 5px;
    }
    margin-bottom: 30px;
    margin-top: ${(props) => (props.pageName === "loginPage" ? "30px" : "0")};
  }
`;

const SignUpExplainText = styled.p`
  font-family: "Noto Sans KR";
  font-weight: 400;
`;

// 회원가입 정보 입력창 컨테이너
const UserInfoContainer = styled.div`
  margin-top: 36px;
  @media (max-width: 1400px) and (min-width: 320px) {
    margin-top: 10px;
  }
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
`;

// 성별
const GenderLabelContainer = styled.label`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 8px;
`;

const GenderAriaContainer = styled.div`
  margin-bottom: 29px;
`;

// 연령
const AgeAriaContainer = styled.label`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 8px;
  @media (max-width: 1400px) and (min-width: 320px) {
    gap: 10px 13px;
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
};
