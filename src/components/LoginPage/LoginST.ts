import styled from "styled-components";

// 소셜 로그인 버튼 프롭 타입
type UrlProps = "kakao" | "naver" | "google";
type SocialLoginButtonProps = {
  url: UrlProps;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// 공통 입력창
const CommonInput = styled.input`
  border: 0.5px solid #a3a3a3;
  font-size: 16px;
  box-sizing: border-box;
  padding: 9.5px 0;
  padding-left: 12px;
  width: 360px;
  line-height: 22px;
  border-radius: 8px;
  &:focus {
    outline: 1px solid #a3bf3b;
  }
`;

// 로그인 버튼
const LoginButton = styled.button`
  font-size: 14px;
  line-height: 22px;
  padding: 10px 17.5px;
  box-sizing: border-box;
  width: 100%;
  color: #ffffff;
  background-color: #a3bf3b;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  &:hover {
    cursor: pointer;
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
`;

// 소셜 회원가입 컨테이너
const SocialLoginContainer = styled.div`
  max-width: 340px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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
const SocialButton = styled.button<SocialLoginButtonProps>`
  background-image: ${(props) => `url(/${props.url}Logo.png)`};
  background-size: 42px;
  background-repeat: no-repeat;
  background-color: ${(props) =>
    backgroundColorMap[props.url] || backgroundColorMap.google};
  color: ${(props) => colorMap[props.url] || colorMap.google};
  box-shadow: 0px 1px 2px 0px #0000001a;
  padding: 13px 99px;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  margin-bottom: 8px;
  font-family: "Pretendard-Regular";
  cursor: pointer;
`;

// 소셜 로그인 안내 문구
const SocialExplainText = styled.p`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  margin-top: 24px;
`;

export default {
  CommonInput,
  LoginButton,
  FindUserInfoContainer,
  SocialLoginContainer,
  SocialButton,
  SocialExplainText,
};
