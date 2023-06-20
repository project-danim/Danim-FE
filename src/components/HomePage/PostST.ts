import styled, { css } from "styled-components";

// 공통 버튼 프롭 타입
type FilterButtonProps = {
  buttonName: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// 게시글 컨테이너 프롭 타입
type PostContainerProps = {
  expired: boolean;
} & React.HTMLProps<HTMLDivElement>;

// 닉네임 프롭 타입
type NickNameProps = {
  profile: string;
};

// 공통 버튼
const CommonButton = styled.button<FilterButtonProps>`
  font-size: ${({ buttonName }) => (buttonName === "search" ? "16px" : "14px")};
  background-color: ${({ buttonName }) =>
    buttonName === "search" ? "#A3BF3B" : "#2E5902"};
  padding: ${({ buttonName }) =>
    buttonName === "search" ? "10px 66px" : "10px 46px"};
  font-weight: ${({ buttonName }) =>
    buttonName === "postDetail" ? "500" : "400"};
  line-height: 22px;
  border-radius: 8px;
  color: #ffffff;
  border: none;
  margin: 0 auto;
  width: ${({ buttonName }) => (buttonName === "postDetail" ? "100%" : "auto")};
  font-family: ${({ buttonName }) =>
    buttonName === "postDetail" ? "Roboto" : "Pretendard-Regular"};
  cursor: pointer;
`;

// 공통 키워드 버튼
const CommonKeywordButton = styled.button`
  font-family: "Pretendard-Regular";
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border: none;
  border-radius: 6px;
  padding: 8px;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  max-height: 36px;
`;

// 마감된 게시글 컨테이너
const expiredPostContainer = styled.div<PostContainerProps>`
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  /* background-color: ${({ expired }) =>
    expired ? "rgba(0, 0, 0, 0.1)" : "transparent"}; */
  z-index: ${({ expired }) => (expired ? 999 : "auto")};
  ${({ expired }) =>
    expired &&
    css`
      &::after {
        content: "모집 마감";
        background-color: #b5bf69;
        position: absolute;
        width: 100%;
        height: 150px;
        border-radius: 8px;
        color: #ffffff;
        top: 43px;
        left: 0;
        font-size: 14px;
        font-weight: 500;
        line-height: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      > * {
        filter: blur(1.6px);
      }
    `};
`;

// 게시글 컨테이너
const postContainer = styled.div`
  border: 0.5px solid #c2c2c2;
  border-radius: 20px;
  padding: 12px;
  padding-bottom: 17px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-family: "Pretendard-Regular";
`;

// 게시글 제목
const postTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  padding: 20px 0;
  /* 말 줄임 스타일링 */
  white-space: nowrap;
  overflow: hidden;
  max-width: 230px;
  text-overflow: ellipsis;
`;

// 게시글 닉네임
const postNickname = styled.p<NickNameProps>`
  padding: 10px 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
  color: #858585;
  display: flex;
  align-items: center;
  &::before {
    content: "";
    display: inline-block;
    background-image: ${(props) =>
      props.profile ? `url(${props.profile})` : `url(/avatar.svg)`};
    width: 24px;
    height: 24px;
    background-position: center;
    background-size: cover;
    margin-right: 8px;
  }
`;

// 게시글 이미지
const postImage = styled.img`
  display: inline-block;
  width: 100%;
  max-width: 242px;
  height: 150px;
  border-radius: 8px;
`;

// 게시글 모집인원 모집기한 컨테이너
const groupSizeAndDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 1px;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  justify-content: space-between;
  width: 100%;
  & > p {
    margin: 10px 0;
  }
`;

// 게시글 키워드 모음 컨테이너
const keywordContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px 8px;
  max-width: 240px;
  box-sizing: border-box;
  padding: 10px 0;
  padding-left: 1px;
  /* border-bottom: 1px solid #c2c2c2; */
  height: 102px;
`;

export default {
  CommonButton,
  CommonKeywordButton,
  expiredPostContainer,
  postContainer,
  postTitle,
  postNickname,
  postImage,
  groupSizeAndDateContainer,
  keywordContainer,
};
