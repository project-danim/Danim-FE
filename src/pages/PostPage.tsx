import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useQuery } from "react-query";
import { useEffect } from "react";
import {
  MapInformation,
  PostComment,
  PostDetailContent,
  PostInformation,
  PostOperationButtonGroup,
} from "../components/PostPage";
import { postIdState, PostGetState } from "../recoil/post/postGetState";
import { getPost } from "../api/post";

function PostPage() {
  // param 값 추출
  const params = useParams();
  const postId = Number(params.id);

  // 서버에서 데이터를 호출
  const { data } = useQuery(["post", postId], () => getPost(postId));

  // recoil 상태에 postId 설정
  const setPostId = useSetRecoilState(postIdState);

  // 서버에서 받아온 데이터들을 recoil 상태 설정
  const setPostData = useSetRecoilState(PostGetState);

  // 서버로부터 데이터를 가져오는 요청이 성공되었을 때 recoil에 postId와 data의 상태 갱신
  useEffect(() => {
    if (data?.data) {
      setPostData(data.data);
      setPostId(postId);
    }
  }, [data, postId, setPostData, setPostId]);

  return (
    <div>
      <PostInformation />
      <PostOperationButtonGroup />
      <br />
      <MapInformation />
      <br />
      <PostDetailContent />
      <br />
      <PostComment />
    </div>
  );
}

export default PostPage;
