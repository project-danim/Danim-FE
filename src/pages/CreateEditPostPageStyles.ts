import styled from "styled-components";

// common : container
export const Container = styled.div`
  width: 100%;
  /* max-width: 591px; */
  margin: 0 auto;
`;

// common : VerticalLineWrapper
export const VerticalLineWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

// common : VerticalLineStyle
export const VerticalLineStyle = styled.div`
  width: 50%;
  height: 10px;
  background-color: #a3bf3b;
`;

// common : contents container
export const ContentsContainer = styled.div`
  width: 100%;
  max-width: 591px;
  margin: 0 auto;
  margin-bottom: 100px;
`;

// post step 1 : wrapper
export const Wrapper1 = styled.div`
  width: 100%;
  margin: 64px 0 64px 0;
  border-color: black;
`;

// post step 2 : 게시글 제목 Wrapper
export const MainInfotextWrapper = styled.div`
  width: 100%;
  margin-top: 100px;
  border-color: black;
`;

// post step 2 : 게시글 제목 Wrapper
export const Wrapper2 = styled.div`
  width: 100%;
  margin: 50px 0 20px 0;
  border-color: black;
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
  display: flex;
`;

// post page 1 : 성별 wrapper
export const GenderWrapper = styled.div`
  flex-grow: 207; // 내부 컴포넌트 하나당의 비율
`;

// post page 1 : 나이 wrapper
export const AgeWrapper = styled.div`
  flex-grow: 110; // 내부 컴포넌트 하나당의 비율
`;

// common : 아래 이동 하단 버튼
export const RouterButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #a4bf3b;
  background-color: transparent;
  transition: background-color 0.2s;
  border-radius: 8px;
  font-size: 16px;
  &:hover {
    border: 1px solid #2f5901;
    background-color: #2f5901;
    color: white;
  }
`;

// common : 이동 버튼
export const ButtonRouterWrapper = styled.div`
  display: flex;
  margin-top: 98px;
  gap: 10px;
`;

// 모집 마감 일자 / 모집 인원
export const RecruitmentAndCouterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;
  justify-content: space-between;
`;

export const RecruitmentAndCouterWrapper = styled.div`
  flex: 1;
`;
