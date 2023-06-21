import styled from "styled-components";

// 메인 메세지 컨테이너
const InformationTextContainer = styled.article`
  font-size: 50px;
  font-weight: 600;
  line-height: 60px;
  text-align: left;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
  gap: 32px;
  margin-top: 132px;
  padding-left: 74px;
`;

// 제목 텍스트
const titleText = styled.h2`
  font-size: 50px;
  font-weight: 600;
  line-height: 60px;
`;

// 페이지 안내 텍스트
const InformationText = styled.p`
  & > span {
    font-size: 50px;
    font-weight: 600;
    line-height: 60px;
    color: #a3bf3b;
  }
`;

// 404 텍스트
const ErrorCodeText = styled.p`
  font-size: 163px;
`;

// 페이지 벗어나기 안내 텍스트
const ExitText = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  margin: 113px 0;
  text-align: center;
`;

// 이미지
const notFouncImg = styled.img`
  width: 100%;
`;

export default {
  InformationTextContainer,
  titleText,
  InformationText,
  ErrorCodeText,
  ExitText,
  notFouncImg,
};
