import React from "react";
import styled, { css } from "styled-components";

// 회원가입,로그인,로그아웃 버튼 프롭
type SignUpButtonProps = {
  buttonName?: string;
} & React.HTMLAttributes<HTMLDivElement>;

// 메뉴바 전체 컨테이너
const MenuBarContainer = styled.div`
  background-color: #f0efe0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  align-items: center;
`;

// 닫기 버튼
const CloseButton = styled.button`
  content: "뒤로 가기";
  display: inline-block;
  background-image: url("/mobile/main/close.svg");
  width: 24px;
  height: 24px;
  text-indent: -9999px;
  background-position: center;
  border: none;
  background-color: transparent;
  position: absolute;
  top: 43px;
  right: 20px;
`;

// 서비스 안내 텍스트
const ServiceInfoText = styled.div`
  margin: 73px 0 42px;
  color: #333;
  text-align: center;
  font-size: 12px;
  line-height: 12px;
  font-weight: 500;
  width: 260px;
  & > p:nth-child(1) {
    margin-bottom: 10px;
  }
`;

// 회원가입 로그인 컨테이너
const SignUpLoginContainer = styled.div<SignUpButtonProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background: #a3bf3b;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  ${({ buttonName }) =>
    buttonName !== "logout" &&
    css`
      &::before {
        content: "";
        display: inline-block;
        width: 0.5px;
        height: 18px;
        border-right: 0.5px solid #f5f5f5;
        position: absolute;
        left: 50%;
      }
    `}
  & > button {
    width: 100%;
    background-color: transparent;
    padding: 16px 0;
    border: none;
    color: #fff;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
  }
`;

// 홈, 마이페이지, 채팅목록 컨테이너
const HomeAndMyAndChatContainer = styled.div`
  box-sizing: border-box;
  background-color: #ffffff;
  width: 100%;
  border-radius: 8px;
  display: flex;
  padding: 2px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 8px 0;
  & > button {
    width: 100%;
    border: none;
    padding: 12px;
    color: #a3bf3b;
    text-align: center;
    text-align: left;
    font-size: 16px;
    font-weight: 400;
    background-color: transparent;
  }
  & > button:nth-child(2) {
    border-top: 0.25px solid #a3bf3b;
    border-bottom: 0.25px solid #a3bf3b;
  }
`;

// 동행 만들기 버튼
const PostButton = styled.button`
  border: none;
  width: 100%;
  padding: 12px 0 12px 28px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #fff;
  color: #a3bf3b;
  text-align: left;
  font-size: 16px;
  font-weight: 400;
`;

// 사용자 프로필 사진
const UserProfile = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  margin: 39px 0 8px;
`;

// 사용자 닉네임
const UserNickname = styled.p`
  color: #000;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

export default {
  MenuBarContainer,
  CloseButton,
  ServiceInfoText,
  SignUpLoginContainer,
  HomeAndMyAndChatContainer,
  PostButton,
  UserProfile,
  UserNickname,
};
