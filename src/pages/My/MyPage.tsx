import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
// import { IoFootsteps } from "react-icons/io5";
import { IoFootsteps } from "react-icons/io5";
import {
  fecthPosts,
  fecthReviews,
  fecthUserInfo,
  fetchMyInfo,
} from "../../api/userInfo";
import { withdrawalUser } from "../../api/signUp";
import * as Styled from "./ReviewAreaStyles";

function MyPage() {
  // 탭 핸들러
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const id = localStorage.getItem("id");
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [owner, setOwner] = useState(true);
  const [score, setScore] = useState(20);
  // 유저 리뷰 상태
  const [reviews, setReviews] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  // 프로필 입력창 ref
  const profileRef = useRef<any>();
  // 유저정보 가져오는 뮤테이션 함수
  const { mutate: mutateGetUserInfo } = useMutation(fecthUserInfo, {
    onSuccess: (response) => {
      const userInfo = response;
      setNickname(() => userInfo.nickname);
      setContent(() => userInfo.content);
      setImgUrl(() => userInfo.imageUrl);
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
  const clickFileInput = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  };
  // 수정하기 버튼 클릭함수
  const clickButton = () => {
    if (!editing) {
      profileRef.current?.focus();
      return setEditing(() => !editing);
    }
    const userInfo = {
      nickname,
      image: null,
      content,
    };
    fetchMyInfo(id, userInfo);
    return setEditing(() => !editing);
  };
  // 탈퇴하기 버튼 클릭시
  // const handleWithDrawalClick = () => {
  //   const response = withdrawalUser();
  // };

  const handleWithDrawalClick = () => {
    const confirmed = window.confirm("정말로 탈퇴하시겠습니까?");

    if (confirmed) {
      withdrawalUser()
        .then(() => {
          alert("회원 탈퇴가 완료되었습니다.");
          window.location.href = "https://www.da-nim.com/";
        })
        .catch(() => {
          alert("회원 탈퇴 중 오류가 발생했습니다.");
        });
    } else {
      alert("회원 탈퇴가 취소되었습니다.");
    }
  };

  // 뒤로가기 버튼 클릭시
  const handleMoveBackClick = () => {
    window.history.back();
  };

  // 작성 게시글 3줄로 줄이기
  // const htmlString = 서버에서 받아오는 값
  // const numSentences = 3;
  // const extractedSentences = extractTextFromHTML(htmlString, numSentences);

  // review.point = 발자국 아이콘으로 변경
  const commentFootprintRating = (point: any) => {
    const icons = [];
    for (let i = 0; i < point; i += 1) {
      icons.push(<IoFootsteps size={14} key={i} />);
    }
    return icons;
  };

  return (
    <Styled.MyPageContainer>
      <Styled.ProfileArea>
        <Styled.ImageBox userProfile={imgUrl}>
          <input type="file" style={{ display: "none" }} id="fileInput" />
          <Styled.ProfileFixButton type="button" onClick={clickFileInput} />
          <Styled.ImageArea />
        </Styled.ImageBox>
        <Styled.UserInfo>
          <Styled.ProfileMileContainer>
            <Styled.ScoreAndNicknameContainer>
              <Styled.Score>{score}</Styled.Score>
              <Styled.UserNickName>
                {nickname}
                <span>님</span>
              </Styled.UserNickName>
            </Styled.ScoreAndNicknameContainer>
            {owner && (
              <div>
                <Styled.FixButton onClick={clickButton}>
                  {editing ? "저장" : "수정하기"}
                </Styled.FixButton>
              </div>
            )}
          </Styled.ProfileMileContainer>
          <Styled.TextArea
            ref={profileRef}
            readOnly={!editing}
            value={content === null ? "" : content}
            placeholder="간단한 자기 소개를 해주세요."
            onChange={(e: any) => setContent(e.target.value)}
          />
        </Styled.UserInfo>
        <Styled.WithDrawalButton type="button" onClick={handleWithDrawalClick}>
          탈퇴하기
        </Styled.WithDrawalButton>
      </Styled.ProfileArea>
      <Styled.TabContainer>
        <Styled.TabButtonWrapper>
          <Styled.TabButton
            active={activeTab === 0}
            onClick={() => handleTabClick(0)}
          >
            리뷰
          </Styled.TabButton>
          <Styled.TabButton
            active={activeTab === 1}
            onClick={() => handleTabClick(1)}
          >
            게시글
          </Styled.TabButton>
        </Styled.TabButtonWrapper>
      </Styled.TabContainer>
      <Styled.TabContent>
        {activeTab === 0 && (
          <div>
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
                      <Styled.CreatedTime>
                        {formattedReviewDate}
                      </Styled.CreatedTime>
                      <Styled.ReviewMile>
                        {commentFootprintRating(review.point)}
                      </Styled.ReviewMile>
                      <Styled.ReviewNickName>
                        {review.userId}
                      </Styled.ReviewNickName>
                    </div>
                    <Styled.ReviewContents>
                      {review.review}
                    </Styled.ReviewContents>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {activeTab === 1 && (
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

              const formattedPostTitle = post.title.replace(/<[^>]*>?/g, "");
              const formattedPostContent = post.content.replace(
                /<[^>]*>?/g,
                ""
              );
              return (
                <div key={`${post.id}-${post.tripEndDate}`}>
                  <div>
                    <div>{formattedPostTitle}</div>
                    <Styled.CreatedTime>{formattedPostDate}</Styled.CreatedTime>
                    <div>{formattedPostContent}</div>
                    {/* <div>{post.imageUrl}</div> */}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Styled.TabContent>
      <Styled.MoveBackButton type="button" onClick={handleMoveBackClick}>
        뒤로 가기
      </Styled.MoveBackButton>
    </Styled.MyPageContainer>
  );
}

export default MyPage;
