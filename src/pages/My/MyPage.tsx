import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { IoFootsteps } from "react-icons/io5";
import { useParams } from "react-router-dom";
import {
  fecthPosts,
  fecthReviews,
  fecthUserInfo,
  fetchMyInfo,
} from "../../api/userInfo";
import { withdrawalUser } from "../../api/signUp";
import * as Styled from "./ReviewAreaStyles";
// import { Footer } from "../../components/common";

function MyPage() {
  // 탭 핸들러
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  // 만약에 로그인 한 유저의 값을 가져오는게 아니라면 param 의 값을 가져옴
  const { id: paramId } = useParams();
  // 로그인한 유저라면 localStorage 에서 가져옴
  const id = paramId;

  const [editing, setEditing] = useState<boolean>(false);
  const [content, setContent] = useState("");
  const [owner, setOwner] = useState(true);
  const [score, setScore] = useState(20);
  const [uploadImg, setUploadImg] = useState("");
  const [nickname, setNickname] = useState("");

  // 유저 정보를 보내는 mutation 함수
  const mutateSendUserInfo = useMutation((userInfo: any) =>
    fetchMyInfo(id, userInfo)
  );
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
      setUploadImg(() => userInfo.imageUrl);
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
      mutateGetReviews(id);
      mutateGetPosts(id);
    }
  }, []);

  // 이미지 업로드 버튼 클릭시
  const clickFileInput = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput?.click();
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    setUploadImg(file);
  };

  // 닉네임 변경 핸들러
  const handleNicknameChange = (event: any) => {
    setNickname(event.target.value);
  };

  // const hadleImageChange = (event: any) => {
  //   setUploadImg(event.target.value);
  // };

  const clickButton = async () => {
    if (!editing) {
      profileRef.current?.focus();
      setEditing((prev) => !prev);
      return;
    }

    const userInfo = {
      nickname,
      image: uploadImg,
      content,
    };

    mutateSendUserInfo.mutate(userInfo, {
      onSuccess: (data) => {
        console.log("수정이 완료되었습니다");
        console.log(data);
      },
      onError: (error) => {
        console.error(error);
      },
    });

    setEditing((prev) => !prev);
  };

  // 탈퇴 메세지 분기, 서버 내 에러 경우의 수가 많아서 "탈퇴에 실패했습니다." 로 통일
  const handleWithDrawalClick = () => {
    const confirmed = window.confirm("정말로 탈퇴하시겠습니까?");
    if (confirmed) {
      withdrawalUser()
        .then(() => {
          alert("회원 탈퇴가 완료되었습니다.");
          window.location.href = "https://www.da-nim.com/";
        })
        .catch((err) => {
          if (err.response.status === 400 || err.response.status === 500) {
            alert("회원 탈퇴에 실패했습니다.");
          } else {
            alert("회원 탈퇴가 취소되었습니다.");
          }
        });
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
      icons.push(<IoFootsteps size={20} color="black" key={i} />);
    }
    return icons;
  };

  // 리뷰 0점을 주게될 경우 평균값이 소숫점으로 떨어지는 이슈 -> 소숫점 반올림
  const fomattedScore = Math.round(score * 10) / 10;
  return (
    <Styled.MyPageContainer>
      <Styled.ProfileArea>
        <Styled.ImageBox userProfile={uploadImg}>
          <input
            type="file"
            style={{ display: "none" }}
            id="fileInput"
            onChange={handleImageUpload}
          />
          <Styled.ProfileFixButton type="button" onClick={clickFileInput} />
          <Styled.ImageArea src={uploadImg} />
        </Styled.ImageBox>
        <Styled.UserInfo>
          <Styled.ProfileMileContainer>
            <Styled.ScoreAndNicknameContainer>
              <Styled.Score>{fomattedScore}</Styled.Score>
              <Styled.UserNickNameWrapper>
                {editing ? (
                  <Styled.UserNickNameInput
                    type="text"
                    value={nickname}
                    onChange={handleNicknameChange}
                  />
                ) : (
                  <Styled.UserNickName>
                    {nickname} <span>님</span>
                  </Styled.UserNickName>
                )}
              </Styled.UserNickNameWrapper>
            </Styled.ScoreAndNicknameContainer>
            {owner && (
              <div>
                <Styled.FixButton
                  onClick={clickButton}
                  style={{
                    backgroundColor: editing ? "#bfbb78" : "white",
                    color: editing ? "white" : "black",
                  }}
                >
                  {editing ? "저장" : "수정하기"}
                </Styled.FixButton>
              </div>
            )}
          </Styled.ProfileMileContainer>
          {editing ? (
            <Styled.ContentWrapper
              ref={profileRef}
              value={content === null ? "" : content}
              placeholder="간단한 자기 소개를 해주세요."
              onChange={(e: any) => setContent(e.target.value)}
            />
          ) : (
            <Styled.Content>{content}</Styled.Content>
          )}
        </Styled.UserInfo>
        <Styled.WithDrawalButton type="button" onClick={handleWithDrawalClick}>
          탈퇴하기
        </Styled.WithDrawalButton>
      </Styled.ProfileArea>
      <Styled.MoveBackButton type="button" onClick={handleMoveBackClick} />
      <Styled.TabContainer>
        <Styled.TabButtonWrapper>
          <Styled.TabButton
            active={activeTab === 0}
            onClick={() => handleTabClick(0)}
          >
            후기
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
            {reviews.length === 0 ? (
              <Styled.NoneReviewsMessage>
                {/* 아직 남겨진 리뷰가 없어요... 같이
                <Styled.Highlight href="https://www.da-nim.com">
                  {" "}
                  다녀{" "}
                </Styled.Highlight>
                볼까요?🌱 */}
                작성된 후기가 없습니다.
              </Styled.NoneReviewsMessage>
            ) : (
              reviews.map((review) => (
                // const formattedReviewDate = new Date(review.createdAt)
                //   .toLocaleString("ko-KR", {
                //     year: "2-digit",
                //     month: "2-digit",
                //     day: "2-digit",
                //     hour12: false,
                //   })
                //   .slice(0, -1);
                <Styled.ReviewContainer
                  key={`${review.userId}-${review.createdAt}`}
                >
                  <div style={{ display: "flex" }}>
                    <Styled.ReviewNickName>
                      {review.nickName}
                    </Styled.ReviewNickName>
                    <Styled.ReviewMile>
                      {commentFootprintRating(review.point)}
                    </Styled.ReviewMile>
                    <Styled.CreatedTime>
                      작성일 | {review.createdAt}
                    </Styled.CreatedTime>
                  </div>
                  <Styled.ReviewContents>
                    {review.comment}
                  </Styled.ReviewContents>
                </Styled.ReviewContainer>
              ))
            )}
          </div>
        )}

        {activeTab === 1 && (
          <div>
            {posts.length === 0 ? (
              <Styled.NonePostsMessage>
                {/* 아직 남기신 게시글이 없어요... 같이
                <Styled.Highlight href="https://www.da-nim.com">
                  {" "}
                  다녀{" "}
                </Styled.Highlight>
                볼까요?🌱 */}{" "}
                작성된 게시글이 없습니다.
              </Styled.NonePostsMessage>
            ) : (
              posts.map((post) => {
                // const formattedPostDate = new Date(post.tripEndDate)
                //   .toLocaleString("ko-KR", {
                //     year: "2-digit",
                //     month: "2-digit",
                //     day: "2-digit",
                //     hour12: false,
                //   })
                //   .slice(0, -1);
                const formattedPostContent = post.content.replace(
                  /<[^>]*>?/g,
                  ""
                );

                return (
                  <Styled.PostContainer key={`${post.id}-${post.tripEndDate}`}>
                    <Styled.TextContainer>
                      <Styled.PostTitle
                        href={`https://www.da-nim.com/post/${post.id}`}
                      >
                        {post.postTitle}
                      </Styled.PostTitle>
                      <Styled.PostDate>
                        {/* 작성일 | {formattedPostDate} */}
                        작성일 | {post.createdAt}
                      </Styled.PostDate>
                      <Styled.PostContent>
                        {formattedPostContent}
                      </Styled.PostContent>
                    </Styled.TextContainer>
                    <Styled.ImageContainer>
                      <img
                        src={post.imageUrl}
                        alt="이미지"
                        style={{
                          width: 205,
                          height: 205,
                          objectFit: "cover",
                        }}
                      />
                    </Styled.ImageContainer>
                  </Styled.PostContainer>
                );
              })
            )}
          </div>
        )}
      </Styled.TabContent>

      {/* <Footer /> */}
    </Styled.MyPageContainer>
  );
}

export default MyPage;
