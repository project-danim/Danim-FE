import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  max-width: 591px;
  margin: 0 auto;
`;

export const Wrapper = styled.div`
  width: 100%;
  margin: 64px 0 64px 0;
  border-color: black;
`;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

// 제목 - 원형 숫자
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

// 제목 - 원형 숫자 옆 text
export const MainInfotext = styled.span`
  font-size: 16px;
`;

// 서브제목
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

export const GenderAgeWrapper = styled.div`
  display: flex;
`;

// 성별 wrapper
export const GenderWrapper = styled.div`
  flex-grow: 207; // 내부 컴포넌트 하나당의 비율
`;

// 나이 wrapper
export const AgeWrapper = styled.div`
  flex-grow: 110; // 내부 컴포넌트 하나당의 비율
`;

//
export const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;
