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
  font-size: 14px;
  background-color: #2e5902;
  font-weight: ${({ buttonName }) =>
    buttonName === "postDetail" ? "500" : "400"};
  line-height: 22px;
  border-radius: 8px;
  color: #ffffff;
  border: none;
  margin: 0 auto;
  font-family: ${({ buttonName }) =>
    buttonName === "postDetail" ? "Roboto" : "Pretendard"};
  background: #2e5902;
  box-sizing: border-box;
  // 공통 버튼 호버
  &:hover {
    border: 2px solid #eaedd4;
  }

  // 자세히보기 버튼
  ${({ buttonName }) =>
    buttonName === "postDetail" &&
    css`
      margin-top: 10px;
      padding: 10px 0;
      width: calc(100% - 24px);
      background: #a3bf3b;
    `}

  // 검색 버튼
  ${({ buttonName }) =>
    buttonName === "search" &&
    css`
      border-radius: 8px;
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
      padding: 10px 89.5px;
      font-size: 16px;
      &:hover {
        padding: 8px 89.5px !important;
      }
    `}

  cursor: pointer;
  &:hover {
    border: 2px solid #eaedd4;
    padding: ${({ buttonName }) =>
      buttonName === "search" ? "10px 66px" : "8px 46px"};
  }
`;

// 공통 키워드 버튼
const CommonKeywordButton = styled.button`
  font-family: inherit;
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
  position: relative;
  /* background-color: ${({ expired }) =>
    expired ? "rgba(0, 0, 0, 0.1)" : "transparent"}; */
  z-index: ${({ expired }) => (expired ? 999 : "auto")};
  ${({ expired }) =>
    expired &&
    css`
      & > img {
        width: 99%;
        height: ;
        margin: 0 auto;
        height: 118px;
      }
      &::after {
        content: "모집 마감";
        background-color: #b5bf69;
        position: absolute;
        /* display: flex; */
        width: 100%;
        height: 120px;
        /* padding: 20px; */
        /* justify-content: center; */
        /* align-items: center; */
        /* gap: 10px; */
        /* border-radius: 8px; */
        color: #ffffff;
        top: 43px;
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
  padding: 12px 0 22px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0;
  /* 채팅 때문에 ui 망가져서 임의로 넣은 max-height 꼭 지우기!! */
  max-height: 457px;
  cursor: pointer;
`;

// 게시글 제목
const postTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
  padding: 10px;
  padding-bottom: 20px;
  /* 말 줄임 스타일링 */
  white-space: nowrap;
  overflow: hidden;
  max-width: 230px;
  text-overflow: ellipsis;
`;

// 게시글 닉네임
const postNickname = styled.p<NickNameProps>`
  padding: 10px 12px;
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
    border-radius: 100px;
    background-position: center;
    background-size: cover;
    margin-right: 8px;
  }
`;

// 게시글 이미지
const postImage = styled.img`
  display: inline-block;
  width: 100%;
  max-width: 265px;
  height: 120px;
  flex-shrink: 0;
`;

// 게시글 모집인원 모집기한 컨테이너
const groupSizeAndDateContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 18px 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  justify-content: space-between;
  gap: 15px;
  & > p {
    color: #000;
    font-size: 14px;
  }
`;

// 게시글 키워드 모음 컨테이너
const keywordContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-height: 102px;
  gap: 10px 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
  padding-bottom: 10px;
  border-bottom: 0.25px solid #c2c2c2;
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
