import styled from "styled-components";

// common : container
export const Container = styled.div`
  width: 100%;
  /* max-width: 591px; */
  margin: 0 auto;

  /* @media (max-width: 375px) {
    width: 100%;
    margin: 10px;
  } */
`;

// common : VerticalLineWrapper
export const VerticalLineWrapper = styled.div`
  display: flex;
  gap: 5px;
  @media (max-width: 375px) {
    gap: 2px;
  }
`;

// common : VerticalLineStyle
export const VerticalLineStyle = styled.div`
  width: 50%;
  height: 10px;
  background-color: #2e5902;
  @media (max-width: 375px) {
    width: 47%;
    margin: 3px;
  }
`;

// common : contents container
export const ContentsContainer = styled.div`
  width: 95%;
  max-width: 591px;
  margin: 0 auto;
  margin-bottom: 100px;
  @media (max-width: 375px) {
    margin-bottom: 30px;
    /* margin: 5px; */
  }
`;

// post step 1 : wrapper
export const Wrapper1 = styled.div`
  width: 100%;
  margin: 64px 0 64px 0;
  border-color: black;
  @media (max-width: 375px) {
    margin: 40px 0;
  }
`;

// post step 2 : 게시글 제목 Wrapper
export const MainInfotextWrapper = styled.div`
  width: 100%;
  margin-top: 100px;
  border-color: black;
  @media (max-width: 375px) {
    margin-top: 30px;
  }
`;

// post step 2 : 게시글 제목 Wrapper
export const Wrapper2 = styled.div`
  width: 100%;
  margin: 50px 0 20px 0;
  border-color: black;
  @media (max-width: 375px) {
    margin: 20px 0 10px 0;
  }
`;

// common : create post - 제목 wrapper
export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

// common : 제목 - 원형 숫자
export const CircleNumbering = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #2e5902;
  color: #ffffff;
  text-align: center;
  margin-right: 8px;
  margin-bottom: 3px;
  font-size: 16px;
  font-family: "Pridi", serif;
`;

// common : 제목 - 원형 숫자 옆 text
export const MainInfotext = styled.span`
  font-size: 16px;
`;

// common : 서브제목
export const SubInfotext = styled.div`
  font-size: 16px;
  color: #858585;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  & > p {
    margin-left: 35px;
    font-size: 12px;
  }
`;

// post page 1 : gender age wrapper
export const GenderAgeWrapper = styled.div`
  /* display: flex; */
`;

// GenderAgeVerticalLine
export const GenderAgeVerticalLine = styled.div`
  height: 2px;
  width: 100%;
  margin: 20px 0;
  background-color: #f5f5f5;
  @media (max-width: 375px) {
    margin: 10px 0;
  }
`;

// common : 아래 이동 하단 버튼
export const RouterButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--button-5-default-color);
  color: var(--button-5-default-color);
  background-color: transparent;
  transition: background-color 0.2s;
  border-radius: 8px;
  font-size: 16px;
  &:hover {
    border: 1px solid var(--button-5-hover-color);
    color: var(--button-5-hover-color);
    cursor: pointer;
  }
  &:active {
    color: white;
    background-color: var(--button-5-pressed-color);
  }
`;

// common : 아래 이동 하단 버튼
export const RouterNextButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: var(--button-1-default-color);
  transition: background-color 0.2s;
  border-radius: 8px;
  font-size: 16px;
  color: white;
  &:hover {
    border: 1px solid var(--button-1-hover-outline-color);
    background-color: var(--button-1-default-color);
    color: white;
  }
  &:active {
    background-color: var(--button-1-pressed-color);
  }
`;

// common : 이동 버튼
export const ButtonRouterWrapper = styled.div`
  display: flex;
  margin-top: 98px;
  gap: 10px;
  @media (max-width: 375px) {
    margin-top: 10px;
  }
`;

// 모집 마감 일자 / 모집 인원
export const RecruitmentAndCouterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
`;

export const RecruitmentAndCouterWrapper = styled.div`
  flex: 1;
`;
