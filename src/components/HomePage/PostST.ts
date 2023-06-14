import styled, { css } from "styled-components";

// 공통 버튼 프롭 타입
type FilterButtonProps = {
  buttonName: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// 게시글 컨테이너 프롭 타입
type PostContainerProps = {
  expired: boolean;
} & React.HTMLProps<HTMLDivElement>;

// 공통 버튼
const CommonButton = styled.button<FilterButtonProps>`
  font-size: ${({ buttonName }) => (buttonName === "search" ? "16px" : "14px")};
  background-color: ${({ buttonName }) =>
    buttonName === "search" ? "#A3BF3B" : "#2E5902"};
  padding: ${({ buttonName }) =>
    buttonName === "search" ? "10px 66px" : "10px 46px"};
  font-weight: 500;
  line-height: 22px;
  border-radius: 8px;
  color: #ffffff;
  border: none;
  margin: 0 auto;
  cursor: pointer;
`;

// 공통 키워드 버튼
const CommonKeywordButton = styled.button`
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border: none;
  border-radius: 6px;
  padding: 8px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

// 마감된 게시글 컨테이너
const expiredPostContainer = styled.div<PostContainerProps>`
  position: relative;
  background-color: ${({ expired }) =>
    expired ? "rgba(0, 0, 0, 0.1)" : "transparent"};
  z-index: ${({ expired }) => (expired ? 999 : "auto")};
  border-radius: 20px;
  ${({ expired }) =>
    expired &&
    css`
      &::after {
        content: "마감된 게시글";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: gray;
        font-weight: 600;
        font-size: 20px;
      }
      > * {
        filter: blur(0.5px);
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
`;

// 게시글 제목
const postTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 33px;
  /* 말 줄임 스타일링 */
  white-space: nowrap;
  overflow: hidden;
  max-width: 230px;
  text-overflow: ellipsis;
`;

// 게시글 닉네임
const postNickname = styled.p`
  margin-top: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  color: #858585;
  &::before {
    content: "";
    display: inline-block;
    background-image: url("/avatar.svg");
    width: 17.2px;
    height: 17.2px;
    margin-right: 8px;
    position: relative;
    top: 4px;
  }
`;

// 게시글 이미지
const postImage = styled.img`
  display: block;
  width: 100%;
  height: 150px;
  // 게시글 사진 확인을 위해 임의로 넣은 border
  border: 0.5px solid #858585;
  border-radius: 5px;
`;

// 게시글 모집인원 모집기한 컨테이너
const groupSizeAndDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  & > p {
    margin: 10px 0;
  }
`;

// 게시글 키워드 모음 컨테이너
const keywordContainer = styled.div`
  overflow-x: scroll;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  max-width: 240px;
  column-gap: 10px;
  margin-bottom: 18px;
  padding-bottom: 10px;
  padding-left: 1px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    height: 3px; /* 스크롤 바 높이 */
  }
  &::-webkit-scrollbar-thumb {
    width: 1px;
    /* 스크롤 바 색상 */
    background-color: #f5f5f5;
    border-radius: 20px;
  }
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
