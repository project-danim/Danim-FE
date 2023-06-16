import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const UserInFoAndButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

// 현재 로그인 중인 유저의 프로필
export const UserProfile = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 10px;
  border-radius: 50%;
`;

// 현재 로그인 중인 유저의 닉네임
export const UserNickname = styled.div`
  font-size: 14px;
  color: grey;
  margin-right: 20px;
`;

// 발자국 모양 별점 카운터
export const FootButton = styled.button`
  border: none;
  background: none;
  width: 24px;
  height: 24px;
`;

// 후기 작성과 버튼 wrapper
export const AddInputButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

// 후기 작성 인풋
export const CommentInput = styled.textarea`
  border: 0.5px solid #a3a3a3;
  font-size: 16px;
  box-sizing: border-box;
  padding: 10.5px 0;
  padding-left: 12px;
  flex: 1;
  line-height: 22px;
  border-radius: 6px;
  background-color: #ffffff;
  color: #a3a3a3;
  margin: 10px;
  height: 100px;
  resize: none;
`;

// 후기 추가 버튼
export const AddCommentButton = styled.button`
  height: 100px;
  width: 100px;
  margin-left: 10px;
  background-color: #2e5902;
  color: white;
  border-radius: 8px;
  border: none;
`;

// 댓글 container
export const CommentContainer = styled.div`
  margin: 25px;
  color: gray;
`;

// 댓글 wrapper
export const CommnetWrapper = styled.div`
  border-bottom: 0.8px solid #a3a3a3;
  margin: 10px 0;
`;

// 댓글 작성자 wrapper
export const CommentWriterWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

// 댓글 작성 유저의 프로필
export const CommentUserProfile = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 10px;
  border-radius: 50%;
`;

// 댓글 작성 유저의 닉네임
export const CommentUserNickname = styled.div`
  margin-right: 10px;
`;

// 평점
export const FootprintRating = styled.div`
  margin-right: 10px;
`;

// 댓글 내용
export const CommentContent = styled.div`
  font-size: 16px;
  margin: 20px 15px;
`;
