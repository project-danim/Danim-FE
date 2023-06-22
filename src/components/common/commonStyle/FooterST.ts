import styled from "styled-components";

// 전체 컨테이너
const footerContainer = styled.div`
  max-width: 1120px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
`;

// 로고 이미지
const danimLogo = styled.img`
  width: 87.5px;
  height: 28px;
  margin-bottom: 49px;
`;

// 로고 이미지와 저작권 컨테이너
const logoAndCopyrightContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  color: 000000;
`;

// 채팅 버튼과 마이페이지 버튼
const chatAndUserButton = styled.button`
  border: none;
  width: 34px;
  height: 34px;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
`;

// 회사 소개, 이용약관, 개인정보, 공지사항 컨테이너
const allInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  & > p {
    border-right: 1px solid #000000;
    padding: 0 8px;
    box-sizing: border-box;
    cursor: pointer;
  }
  & > p:nth-child(3) {
    font-weight: 600;
  }
  & > p:last-child {
    border-right: none;
  }
`;

export default {
  footerContainer,
  logoAndCopyrightContainer,
  danimLogo,
  chatAndUserButton,
  allInfoContainer,
};
