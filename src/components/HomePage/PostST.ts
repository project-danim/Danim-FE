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
      // 모바일
      @media (max-width: 430px) and (min-width: 375px) {
        margin-top: 60px;
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
  // 모바일
  @media (max-width: 430px) and (min-width: 375px) {
    padding: 1px 4px;
    line-height: 14px;
    font-size: 12px;
    font-weight: 400;
    border-radius: 2px;
    background: #f5f5f5;
    min-height: auto;
  }
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
        margin: 0 auto;
        height: 118px;
        @media (min-width: 375px) and (max-width: 430px) {
          height: 129px;
        }
      }
      &::after {
        content: "모집 마감";
        /* background-color: #b5bf69; */
        background-color: rgba(128, 128, 128, 0.5);
        position: absolute;
        width: 100%;
        height: 118px;
        color: #ffffff;
        top: 43px;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        @media (min-width: 375px) and (max-width: 430px) {
          top: 0;
          height: 129px;
        }
      }
      > * {
        filter: blur(1.2px);
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
  cursor: pointer;
  @media (min-width: 375px) and (max-width: 430px) {
    padding: 0;
    border: none;
  }
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
  @media (min-width: 375px) and (max-width: 430px) {
    width: 171px;
    padding: 0;
    color: rgba(0, 0, 0, 0.9);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 20px;
  }
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
  @media (min-width: 375px) and (max-width: 430px) {
    padding: 0;
    overflow: hidden;
    color: #c2c2c2;
    text-overflow: ellipsis;
    font-size: 12px;
    font-family: Roboto;
    font-weight: 400;
    line-height: 16px;
    &::before {
      width: 16px;
      height: 16px;
      margin: 4px 0;
      margin-right: 4px;
    }
  }
`;

// 게시글 이미지
const postImage = styled.img`
  display: inline-block;
  width: 100%;
  max-width: 265px;
  height: 120px;
  flex-shrink: 0;
  @media (min-width: 375px) and (max-width: 430px) {
    width: 171px;
    height: 129px;
    border-radius: 6px;
  }
`;

// 모집 기한 텍스트
const dateText = styled.p`
  color: #a3a3a3;
  font-size: 12px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
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
  align-content: flex-start;
  @media (min-width: 375px) and (max-width: 430px) {
    padding: 0;
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    min-height: 43px;
    border-bottom: none;
    padding-bottom: 4px;
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
  dateText,
  groupSizeAndDateContainer,
  keywordContainer,
};
