import styled from "styled-components";

// container
export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

// 제목, 게시글 정보, 버튼 wrapper
export const PostInfoAndButtonGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 75px 25px 0 25px;
`;

// 세로선
export const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d6d6d6;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const MapInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 360px;
  width: 100%;
`;

export const PostContentWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
  /* width: 100%; */
  margin: 50px 0;
  /* 체크 필요 ! min-height: 500px; */
  min-height: 200px;
`;

export const PostCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
