import styled from "styled-components";

// 프로필 박스 영역
export const ProfileArea = styled.div`
  width: 1120px;
  height: 315px;
  display: flex;
  justify-content: center; 
  background-color: white;

`;

// 프로필 박스 내 이미지 박스 영역
export const ImageBox = styled.div`
  width: 232px;
  height: 232px;
`;

// 프로필 박스 내 이미지 업로드 영역(원, 클릭시~)
export const ImageArea = styled.div`
  width: 232px;
  height: 232px;
  border-radius: 200px;
  background-color: rgba(181, 191, 105, 1);
`;

// 유저인포(스코어, 닉네임, 수정)영역
export const UserInfo = styled.div`
  display: flex;
  width: 1120px;
  height: 42px;
`;

// 유저 스코어 영역(mile 상위태그)
export const ProfileMileContainer = styled.div`
  width: 79px;
  height: 33px;
  border: 1px solid rgba(243, 246, 250, 1);
  border-radius: 20px;
  background-color: rgba(243, 246, 250, 1);
  display: flex;            
  justify-content: center; 
  align-items: center;   
  font-size: 14px;
  line-height: 17px;

`;
// 마일(review.point) 노출 영역
export const ProfileMileBox = styled.div`
  width: 34px;
  height: 21px;
  border: 1px solid rgba(126, 168, 227, 1);
  border-radius: 6px;
  background-color: rgba(126, 168, 227, 1);
  color: rgba(255, 255, 255, 1);
  margin-left: 4px;
  
`;
// mile 텍스트가 들어간 파란색 박스 영역
export const ProfileMile = styled.div`
text-align: center;
margin-top: 2px;
`;

// 유저 닉네임 영역

export const UserNickName = styled.div`
  width: 70px;
  height: 24px;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  margin-left: 8px;
  margin-top: 2px;

`;

// 수정 버튼 영역
export const PixButton = styled.button`
  width: 107px;
  height: 42px;
  border: 1px solid rgba(213, 213, 213, 1);
  border-radius: 8px;
  background-color: white;
  color: rgba(133, 133, 133, 1);
  margin-left: 632px;
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
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  resize: none;
`;





export const ReviewMile = styled.div`
  width: 75px;
  height: 14px;
  color: rgba(0, 0, 0, 0.5);
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

