import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import * as Styled from "./ReviewAreaStyles";
import { fecthPosts, fecthReviews } from "../../api/userInfo";

// 유저 리뷰 상태
// const [reviews, setReviews] = useState<any[]>([]);
// const [posts, setPosts] = useState<any[]>([]);
// const id = sessionStorage.getItem("id");

// 리뷰 가져오는 뮤테이션 함수
// const { mutate: mutateGetReviews } = useMutation(fecthReviews, {
//   onSuccess: (response) => {
//     setReviews(() => [...reviews, ...response]);
//   },
//   onError: (error) => {
//     console.error(error);
//   },
// });

// // 게시글 가져오는 뮤테이션 함수
// const { mutate: mutateGetPosts } = useMutation(fecthPosts, {
//   onSuccess: (response) => {
//     setPosts(() => [...posts, ...response]);
//   },
//   onError: (error) => {
//     console.error(error);
//   },
// });

// useEffect(() => {
//   if (id) {
//     mutateGetReviews(id);
//     mutateGetPosts(id);
//   }
// }, []);

function PostsList() {
  const [postsActiveTab, setPostsActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setPostsActiveTab(index);
  };

  return (
    <div>
      <Styled.TabContainer>
        <Styled.TabButtonWrapper>
          <Styled.TabButton
            active={postsActiveTab === 0}
            onClick={() => handleTabClick(0)}
          >
            리뷰
          </Styled.TabButton>
          <Styled.TabButton
            active={postsActiveTab === 1}
            onClick={() => handleTabClick(1)}
          >
            게시글
          </Styled.TabButton>
        </Styled.TabButtonWrapper>
      </Styled.TabContainer>
      <Styled.TabContent>
        {postsActiveTab === 0 && (
          <div>
            {/* {reviews.map((review) => {
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
                      <Styled.ReviewMile>{review.point}</Styled.ReviewMile>
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
            })} */}
          </div>
        )}
        {postsActiveTab === 1 && (
          <div>
            {/* {posts.map((post) => {
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
                    <Styled.CreatedTime>{formattedPostDate}</Styled.CreatedTime>
                    <div>{post.content}</div>
                    <div>{post.imageUrl}</div>
                  </div>
                </div>
              );
            })} */}
          </div>
        )}
      </Styled.TabContent>
    </div>
  );
}

export default PostsList;
