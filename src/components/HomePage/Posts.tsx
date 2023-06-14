import { useRecoilState } from "recoil";
import { useState } from "react";
import {
  filterList,
  isExpiredPostState,
} from "../../recoil/filter/filterdPost";
import Post from "./Post";
import st from "./PostsST";

function Posts({ posts, lastPostRef }: any) {
  // 전체 게시글 state
  const [allPosts] = useState([]);
  // 키워드(맛집탐방,투어 등) state
  const [allFilterList] = useRecoilState(filterList);
  // 마감된 게시글 포함할지 토글 state
  const [includeExpiredPost] = useRecoilState(isExpiredPostState);

  return posts.length !== 0 ? (
    <st.postsContainer>
      {posts.map((post: any, index: number) => (
        <Post
          ref={index === posts.length - 1 ? lastPostRef : undefined}
          key={post.id}
          // post={
          //   includeExpiredPost
          //     ? posts
          //         .filter(
          //           (includeExpired: any) =>
          //             includeExpired.isRecruitmentEnd === false
          //         )
          //         .map((expiredPost: any) => expiredPost)
          //     : post
          // }

          post={post}
          allFilterList={allFilterList}
        />
      ))}
    </st.postsContainer>
  ) : (
    <st.noPostContainer>
      {posts === allPosts
        ? "게시글이 존재하지 않습니다."
        : "조건에 맞는 게시글이 존재하지 않습니다."}
    </st.noPostContainer>
  );
}

export default Posts;
