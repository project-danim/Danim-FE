import styled from "styled-components";

export const Container = styled.div`
  /* width: 100%; */
`;

export const TitleWrapper = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  margin: 20px 0px;
`;

// 유저 닉네임
export const NicknameWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: grey;
  margin: 10px 0;
`;

// 프로필 사진
export const ProfileImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 50%;
`;

// 모집기한, 출발날짜, 도착날짜 Wrapper
export const DateWrapper = styled.div`
  display: flex;
`;

// text wrapper - 모집 인원, 모집 기한, 출발 날짜, 도착 날짜
export const TextWapper = styled.div`
  font-size: 14px;
  margin: 10px 0;
  margin-right: 24px;
  display: flex;
`;

export const DateVerticalLine = styled.div`
  border-left: 1.3px solid black;
  height: 100%;
  margin-right: 7px;
`;

// 컨텐츠 키워드 Wrapper
export const KeywordWrapper = styled.div`
  display: flex;
  font-size: 14px;
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
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border: none;
  border-radius: 6px;
  padding: 8px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;
