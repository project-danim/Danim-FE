import styled from "styled-components";


// 최상단 컨테이너
export const ParentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 프로필 박스 영역
export const ProfileArea = styled.div`
  width: 1120px;
  height: 315px;
  display: flex;
  background-color: white;
`;

// 프로필 박스 내 이미지 박스 영역
export const ImageBox = styled.div`
  width: 170px;
  height: 170px;
`;

// 프로필 박스 내 이미지 업로드 영역(원, 클릭시~)
export const ImageArea = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(181, 191, 105, 1);
  margin-top: 30px;
`;

// UserInfo 컴포넌트를 감싸는 컨테이너
export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

// 유저인포(스코어, 닉네임, 수정)영역
export const UserInfo = styled.div`
  display: flex;
  align-items: flex-start;
  width: 700px;
  height: 20px;
  padding: 10px;
  justify-content: space-between;
`;

// 유저 스코어 영역
export const UserScore = styled.div`
  border: 1px solid black;
  width: 120px;
  height: 22px;
  border-radius: 7px;
  border: none;
  margin-right: 30px;
`;

// 유저 닉네임 영역
export const NickName = styled.div`
  width: 120px;
  height: 22px;
  border-radius: 7px;
  border: none;
`;

// 수정 버튼 영역
export const PixButton = styled.button`
  width: 141px;
  height: 42px;
  border: 1px solid #d5d5d5;
  border-radius: 8px;
  background-color: white;
  color: black;
  position: relative;
  align-self: flex-end;
  margin-top: 10px;
  margin-left: 400px;
`;

// 텍스트 입력 영역
export const TextArea = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 809px;
  height: 184px;
  font-size: 15px;
  /* margin-bottom: 100px; */
  padding: 20px;
  gap: 10px;
  border: 1px solid #d6d6d6;
  box-shadow: 0px 0px 0px #cbdafc;
  border-radius: 5px;
  resize: none;
`;

// 후기, 게시글 영역
export const PostContainer = styled.div`
  width: 1120px;
  background-color: white;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  font-size: 16px;
`;

// 임시 영역
export const ImsiArea = styled.div`
  width: 1120px;
  display: flex;
  border-bottom: 1px solid rgba(181, 191, 105, 1);
  position: absolute;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  justify-content: space-between;
`;

// 리뷰 영역
export const ReviewArea = styled.div`
  margin-left: 280px;
`;

// 작성한 게시글 영역
export const PostArea = styled.div`
  margin-right: 280px;
`;

export const ImsiArea2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 160px;
  text-align: left;
  border-bottom: 1px solid #d6d6d6;
`;

export const CreatedTime = styled.div`
  color: rgba(133, 133, 133, 1);
  width: 74px;
  height: 34px;
`;

export const Mile = styled.div`
  width: 75px;
  height: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

export const ReviewNickName = styled.div`
  width: 118px;
  height: 36px;
  color: rgba(0, 0, 0, 0.5);
`;

export const ReviewContents = styled.div`
  width: 458px;
  height: 59px;
  color: rgba(0, 0, 0, 1);
`;

export const ReviewContainer = styled.div`
  width: 1119px;
  height: 254px;
  margin-top: 150px;
`;

