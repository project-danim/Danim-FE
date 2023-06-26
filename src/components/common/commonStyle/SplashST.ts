import styled from "styled-components";

// 전체 배경
const background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column-reverse;
  background-color: var(--button-1-default-color);
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

// 다님 텍스트 로고
const danimTextLogo = styled.img`
  width: 87px;
`;

// 다님 로고 이미지
const danimLogo = styled.img`
  width: 120px;
`;

// 메인 텍스트
const mainText = styled.img`
  width: 183px;
`;

export default {
  background,
  danimLogo,
  danimTextLogo,
  mainText,
};
