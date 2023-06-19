import { useEffect, useState } from "react";
import { useMutation } from "react-query";
// import { IoFootsteps } from "react-icons/io5";
import {
  fecthPosts,
  fecthReviews,
  fecthUserInfo,
  fetchMyInfo,
} from "../../api/userInfo";
import {
  CreatedTime,
  ImageArea,
  ImageBox,
  ImsiArea,
  ImsiArea2,
  ReviewMile,
  UserNickName,
  PixButton,
  PostArea,
  PostContainer,
  ProfileArea,
  ProfileMile,
  ReviewArea,
  ReviewContainer,
  ReviewContents,
  ReviewNickName,
  TextArea,
  UserInfo,
  ProfileMileContainer,
  ProfileMileBox,
} from "./ReviewAreaStyles";

function MyPage() {
  const id = sessionStorage.getItem("id");
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  // const [imgUrl, setImgUrl] = useState("");
  const [owner, setOwner] = useState(true);
  const [score, setScore] = useState(20);
  // 유저 리뷰 상태
  const [reviews, setReviews] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  // 유저정보 가져오는 뮤테이션 함수
  const { mutate: mutateGetUserInfo } = useMutation(fecthUserInfo, {
    onSuccess: (response) => {
      const userInfo = response;
      setNickname(() => userInfo.nickname);
      setContent(() => userInfo.content);
      // setImgUrl((prev) => userInfo.imgUrl);
      setOwner(() => userInfo.owner);
      setScore(() => userInfo.score);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 리뷰 가져오는 뮤테이션 함수
  const { mutate: mutateGetReviews } = useMutation(fecthReviews, {
    onSuccess: (response) => {
      setReviews(() => [...reviews, ...response]);
      // reviews.map((review)=>review.title)
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 게시글 가져오는 뮤테이션 함수
  const { mutate: mutateGetPosts } = useMutation(fecthPosts, {
    onSuccess: (response) => {
      setPosts(() => [...posts, ...response]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // 컴포넌트 렌더링 시 유저정보, 리뷰 가져오기
  useEffect(() => {
    if (id) {
      mutateGetUserInfo(id);
      // mutatePutMyInfo(id);
      mutateGetReviews(id);
      mutateGetPosts(id);
    }
  }, []);

  // 이미지 버튼 클릭시
  // const clickFileInput = () => {
  //   const fileInput = document.getElementById("fileInput");
  //   fileInput?.click();
  // };

  // 수정하기 버튼 클릭함수
  const clickButton = () => {
    if (editing) {
      const userInfo = {
        nickname,
        image: null,
        content,
      };
      fetchMyInfo(id, userInfo);
    }
    setEditing(() => !editing);
  };

  // 작성 게시글 3줄로 줄이기
  // const htmlString = 서버에서 받아오는 값
  // const numSentences = 3;
  // const extractedSentences = extractTextFromHTML(htmlString, numSentences);

  // review.point = 발자국 아이콘으로 변경
  // const commentFootprintRating = (reviews.point) => {
  //   const icons = [];
  //   for (let i = 0; i < (reviews.point); i += 1) {
  //     icons.push(<IoFootsteps size={14} key={i} />);
  //   }
  //   return icons;
  // };

  return (
    <>
      <ProfileArea>
        <ImageBox>
          {/* <input type="file" style={{ display: "none" }} id="fileInput" />
          <button type="button" onClick={clickFileInput}>
            이미지 수정
          </button> */}
          <ImageArea />
        </ImageBox>

        <UserInfo>
          <ProfileMileContainer>
            {score}
            <ProfileMileBox>
              <ProfileMile>mile</ProfileMile>
            </ProfileMileBox>
          </ProfileMileContainer>
          <UserNickName>{nickname}님</UserNickName>
          {owner && (
            <div>
              <PixButton onClick={clickButton}>
                {editing ? "저장" : "수정하기"}
              </PixButton>
              <TextArea
                readOnly={!editing}
                value={content}
                placeholder="간단한 자기 소개를 해주세요."
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          )}
        </UserInfo>
      </ProfileArea>

      <PostContainer>
        <ImsiArea>
          {/* 게시글 상 하단 실선 추가 */}
          <ReviewArea>리뷰</ReviewArea>
          <PostArea>게시글</PostArea>
        </ImsiArea>
        <ImsiArea2>
          <ReviewContainer>
            {reviews.map((review) => {
              const formattedReviewDate = new Date(review.createdAt)
                .toLocaleString("ko-KR", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                  hour12: false,
                })
                .slice(0, -1);

              return (
                <div key={`${review.userId}-${review.createdAt}`}>
                  <div>
                    <div style={{ display: "flex" }}>
                      <CreatedTime>{formattedReviewDate}</CreatedTime>
                      <ReviewMile>{review.point}</ReviewMile>

                      <ReviewNickName>{review.userId}</ReviewNickName>
                    </div>
                    <ReviewContents> {review.review}</ReviewContents>
                  </div>
                </div>
              );
            })}
            <div>
              {posts.map((post) => {
                const formattedPostDate = new Date(post.tripEndDate)
                  .toLocaleString("ko-KR", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                    hour12: false,
                  })
                  .slice(0, -1);

                return (
                  <div key={`${post.id}-${post.tripEndDate}`}>
                    <div>
                      <div>{post.title}</div>
                      <CreatedTime>{formattedPostDate}</CreatedTime>
                      <div>{post.content}</div>
                      <div>{post.imageUrl}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ReviewContainer>
        </ImsiArea2>
      </PostContainer>
    </>
  );
}

export default MyPage;
