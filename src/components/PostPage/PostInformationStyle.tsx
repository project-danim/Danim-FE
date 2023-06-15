import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const TitleWrapper = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  margin: 20px 0px;
`;

export const NicknameWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const DateWrapper = styled.div`
  display: flex;
`;

// text wrapper - 모집 인원, 모집 기한, 출발 날짜, 도착 날짜
export const TextWapper = styled.div`
  font-size: 14px;
`;

// 컨텐츠 키워드 Wrapper
export const KeywordWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const AgeGenderWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

// 컨텐츠 키워드 별 각각 Wrapper - keyword, location, ageRange, gender
export const SingleKeywordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 18px 0;
`;
