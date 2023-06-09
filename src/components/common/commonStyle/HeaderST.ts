import styled, { css } from "styled-components";

// 버튼 프롭 타입 정의
type CommonStyleButtonProps = {
  buttonName: string;
  profile?: string | null;
  hasNew?: boolean | null;
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
  font-family: inherit;
  border: ${(props) =>
    props.buttonName === "post" ? "1px solid #A3BF3B" : "1px solid #2E5902"};
  background-color: ${(props) => backgroundColorMap[props.buttonName]};
  color: ${(props) => colorMap[props.buttonName]};
  padding: ${(props) => (props.buttonName === "post" ? "5px 48px" : "5px 0")};
  min-width: ${(props) => (props.buttonName === "post" ? "auto" : "110px")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  border-radius: 50px;
  cursor: pointer;
  box-sizing: border-box;
  margin-right: ${(props) => (props.buttonName === "post" ? "48px" : null)};
  @media (max-width: 450px) and (min-width: 375px) {
    font-size: 13px;
    min-width: ${(props) => (props.buttonName === "post" ? "auto" : "90px")};
  }
`;

// 헤더 영역 전체
const headerAria = styled.div`
  width: 100%;
  background-color: #ffffff;
`;

// 헤더 컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  @media (max-width: 450px) and (min-width: 375px) {
    padding: 0 20px;
  }
`;

// 페이지 제목
const DanimTitle = styled.h1`
  text-indent: -9999px;
  position: absolute;
  height: 0;
`;

// 로고
const DanimLogo = styled.img`
  width: 92px;
  height: 28px;
  cursor: pointer;
`;

// 버튼 컨테이너
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  // 모바일
  @media (max-width: 450px) and (min-width: 375px) {
    width: 100%;
    justify-content: space-between;
    & > button {
      border: none;
      background-color: transparent;
    }
    gap: 8px;
  }
`;

// 모바일 버튼 컨테이너
const MobileButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & > button {
    border: none;
    background-color: transparent;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// 채팅 버튼과 마이페이지 버튼
const chatAndUserButton = styled.button<CommonStyleButtonProps>`
  border: none;
  width: 34px;
  height: 34px;
  padding: 0;
  background-color: transparent;
  position: relative;
  ${({ hasNew }) =>
    hasNew &&
    css`
      &::after {
        content: "";
        display: inline-block;
        border-radius: 8px;
        background: #7ea8e3;
        width: 16px;
        height: 16px;
        position: relative;
        bottom: 40px;
        left: 12px;
        // 모바일
        @media (max-width: 450px) and (min-width: 375px) {
          width: 8px;
          height: 8px;
          bottom: -2px;
          left: -8px;
        }
      }
    `}

  cursor: pointer;
`;

// 소셜 로그인 이미지 프로필
const userProfile = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 100px;
`;

export default {
  headerAria,
  Container,
  DanimTitle,
  DanimLogo,
  ButtonContainer,
  MobileButtonContainer,
  CommonStyleButton,
  chatAndUserButton,
  userProfile,
};
