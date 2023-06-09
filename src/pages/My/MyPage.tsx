import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// 최상단 컨테이너
const ParentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 프로필 박스 영역
const ProfileArea = styled.div`
  width: 1120px;
  height: 315px;
  display: flex;
  background-color: white;
`;

// 프로필 박스 내 이미지 박스 영역
const ImageBox = styled.div`
  width: 170px;
  height: 170px;
`;

// 프로필 박스 내 이미지 업로드 영역(원, 클릭시~)
const ImageArea = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(181, 191, 105, 1);
  margin-top: 30px;
`;

// UserInfo 컴포넌트를 감싸는 컨테이너
const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

// 유저인포(스코어, 닉네임, 수정)영역
const UserInfo = styled.div`
  display: flex;
  align-items: flex-start;
  width: 700px;
  height: 20px;
  padding: 10px;
`;

// 유저 스코어 영역
const UserScore = styled.div`
  border: 1px solid black;
  width: 120px;
  height: 22px;
  border-radius: 7px;
  border: none;
`;

// 유저 닉네임 영역
const NickName = styled.div`
  width: 120px;
  height: 22px;
  border-radius: 7px;
  border: none;
`;

// 수정 버튼 영역
const PixButton = styled.button`
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
const TextArea = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 809px;
  height: 184px;
  font-size: 15px;
  margin-bottom: 100px;
  padding: 20px;
  gap: 10px;
  border: 1px solid #d6d6d6;
  box-shadow: 0px 0px 0px #cbdafc;
  border-radius: 5px;
  resize: none;
`;

// 후기, 게시글 영역
const PostContainer = styled.div`
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
const ImsiArea = styled.div`
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
const ReviewArea = styled.div`
  margin-left: 280px;
`;

// 작성한 게시글 영역
const PostArea = styled.div`
  margin-right: 280px;
`;

const ImsiArea2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 160px;
  text-align: left;
  border-bottom: 1px solid #d6d6d6;
`;

// 리뷰 데이터 타입
interface ReviewDataType {
  postTitle: string;
  userId: string;
  review: { review: string; score: number }[];
  score: number;
  date: string;
}

function MyPage() {
  const [reviews, setReviews] = useState<ReviewDataType[]>([]);
  const [editing, setEditing] = useState(false);
  const [intro, setIntro] = useState("");
  //   const fetchData = async () => {
  //     try {
  //       const { data } = await axios.get("");
  //       setReviews(data);
  //     } catch (error) {
  //       console.error("데이터 가져오기 오류 입니다", error);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Axios 로직 추가

    setEditing(false);
  };

  const handleIntroChange = (event: any) => {
    setIntro(event.target.value);
  };

  return (
    <ParentContainer>
      <ProfileArea>
        <ImageBox>
          <ImageArea />
        </ImageBox>
        <UserInfoContainer>
          <UserInfo>
            <UserScore>
              {/* {reviews?.map((item) => (
                <div key={item.userId}>
                  <div>10 mile</div>
                </div>
              ))} */}
              <div>TEST mile</div>
            </UserScore>
            <NickName>
              {/* {reviews?.map((item) => (
                <div key={item.userId} />
              ))} */}
              <div style={{ fontWeight: "bold" }}>TEST님</div>
            </NickName>
            {editing ? (
              <PixButton onClick={handleSaveClick}>저장</PixButton>
            ) : (
              <PixButton onClick={handleEditClick}>수정하기</PixButton>
            )}
          </UserInfo>
          {editing ? (
            <TextArea
              value={intro}
              onChange={handleIntroChange}
              placeholder="간단한 자기 소개를 해주세요."
            />
          ) : (
            <div>수정하기를 통해 프로필을 수정할 수 있습니다.</div>
          )}
        </UserInfoContainer>
      </ProfileArea>
      <PostContainer>
        <ImsiArea>
          <ReviewArea>후기</ReviewArea>
          <PostArea>게시글</PostArea>
        </ImsiArea>
        <ImsiArea2>
          <div style={{ fontWeight: "bold" }}>
            강남역에서 삼겹살 같이 드실 분!
          </div>
          <div style={{ fontSize: "16px", color: "gray", margin: "10px" }}>
            23.06.07 ★★★★★ 클레오파트라
          </div>
          <div>
            대중교통 이용해서 같이 강남 구경 잘 하고 맛있는 고기 먹고 갑니다!
          </div>
        </ImsiArea2>
      </PostContainer>
    </ParentContainer>
  );
}

export default MyPage;
