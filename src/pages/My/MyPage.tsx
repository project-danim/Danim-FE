import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useMutation } from "react-query";
import loginUserIdState from "../../recoil/login/userInfo";
import { fecthMyInfo, fecthUserInfo } from "../../api/userInfo";

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
  justify-content: space-between;
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
interface ReviewsDataType {
  postTitle: string;
  userId: string;
  review: { review: string; score: number }[];
  score: number;
  date: string;
}

function MyPage() {
  const id = sessionStorage.getItem("id");
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [owner, setOwner] = useState(true);
  const [score, setScore] = useState(20);

  // 유저정보 가져오는 뮤테이션 함수
  const { mutate: mutateGetUserInfo } = useMutation(fecthUserInfo, {
    onSuccess: (response) => {
      const userInfo = response;
      setNickname((prev) => userInfo.nickname);
      setContent((prev) => userInfo.content);
      setImgUrl((prev) => userInfo.imgUrl);
      setOwner((prev) => userInfo.owner);
      setScore((prev) => userInfo.score);
    },
    onError: (error) => {},
  });

  // 내 정보 수정
  const { mutate: mutatePutMyInfo } = useMutation(fecthMyInfo, {
    onSuccess: (response) => {
      const myInfo = response;
      setNickname((prev) => myInfo.nickname);
      setContent((prev) => myInfo.content);
      setImgUrl((prev) => myInfo.imgUrl);
    },
    onError: (error) => {},
  });

  const editHandler = () => {
    setEditing((prevEditing) => !prevEditing);
  };

  useEffect(() => {
    if (id) {
      mutateGetUserInfo(id);
      mutatePutMyInfo(id);
    }
  }, []);

  return (
    <ParentContainer>
      <ProfileArea>
        <ImageBox>
          <ImageArea />
        </ImageBox>
        <UserInfoContainer>
          <UserInfo>
            <UserScore>
              <div>{score}mile</div>
            </UserScore>
            <NickName>
              <div>{nickname}님</div>
            </NickName>

            {owner && !editing && (
              <div>
                <div>
                  <PixButton onClick={editHandler}>수정하기</PixButton>
                  {content === null ? (
                    <div>수정하기를 통해 프로필을 수정할 수 있습니다.</div>
                  ) : (
                    <div>{content}</div>
                  )}
                </div>
              </div>
            )}
            {editing && (
              <div>
                <div>
                  <TextArea
                    value={content}
                    placeholder="간단한 자기 소개를 해주세요."
                  />
                </div>
                <div>
                  <PixButton>저장</PixButton>
                </div>
              </div>
            )}
          </UserInfo>
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
