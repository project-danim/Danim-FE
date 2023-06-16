import styled from "styled-components";

// container
export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

// wrapper
export const PostInfoAndButtonGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* width: 100%; */
  margin: 75px 25px;
`;

export const MapInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
