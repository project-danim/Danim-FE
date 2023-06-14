import styled from "styled-components";

// 버튼 프롭 타입 정의
type CommonStyleButtonProps = {
  buttonName: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// 공통 버튼 배경 색상, 글자 색상 맵
const backgroundColorMap: any = {
  signUp: "#FFFFFF",
  login: "#2E5902",
  logout: "#FFFFFF",
  post: "#A3BF3B",
};
const colorMap: any = {
  signUp: "#2E5902",
  login: "#FFFFFF",
  logout: "#2E5902",
  post: "#FFFFFF",
};

// 공통 버튼
const CommonStyleButton = styled.button<CommonStyleButtonProps>`
  border: none;
  border: ${(props) =>
    props.buttonName === "post" ? "1px solid #A3BF3B" : "1px solid #2E5902"};
  background-color: ${(props) => backgroundColorMap[props.buttonName]};
  color: ${(props) => colorMap[props.buttonName]};
  padding: ${(props) =>
    props.buttonName === "post" ? "6px 43px" : "6px 30.5px"};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  border-radius: 50px;
  cursor: pointer;
  box-sizing: border-box;
`;

// 헤더 컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

// 로고
const DanimLogo = styled.h1`
  text-indent: -9999px;
  background: url("danimLogo.svg") no-repeat;
  width: 87px;
  height: 28px;
  overflow: hidden;
  cursor: pointer;
`;

// 버튼 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > button {
    margin-right: 16px;
  }
`;

// 채팅 버튼과 마이페이지 버튼
const chatAndUserButton = styled.button<CommonStyleButtonProps>`
  background-image: ${(props) => `url(/header/${props.buttonName}.svg)`};
  background-size: cover;
  border: none;
  background-color: transparent;
  text-indent: -9999px;
  width: 34px;
  height: 34px;
  cursor: pointer;
`;

export default {
  Container,
  DanimLogo,
  ButtonContainer,
  CommonStyleButton,
  chatAndUserButton,
};
