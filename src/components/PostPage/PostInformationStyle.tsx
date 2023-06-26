import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  /* margin: 10px; */
  @media (max-width: 375px) {
    width: 95%;
  }
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
  @media (max-width: 375px) {
    display: flex;
    flex-direction: column;
  }
`;

// text wrapper - 모집 인원, 모집 기한, 출발 날짜, 도착 날짜
export const TextWapper = styled.div`
  font-size: 14px;
  margin: 10px 0;
  margin-right: 24px;
  /* min-width: 100px; */
  display: flex;
  @media (max-width: 375px) {
    margin: 0px 0;
  }
`;

export const DateVerticalLine = styled.div`
  border-left: 1.3px solid black;
  height: 100%;
  margin-right: 7px;
  @media (max-width: 375px) {
    border: 0;
    height: 0;
    margin-right: 0;
  }
`;

// 컨텐츠 키워드 Wrapper
export const KeywordWrapper = styled.div`
  display: flex;
  font-size: 14px;
  gap: 10px;
  @media (max-width: 375px) {
    flex-direction: column;
  }
`;

export const AgeGenderWrapper = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 375px) {
  }
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
  @media (max-width: 375px) {
    max-width: 50px;
    min-width: 20px;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
