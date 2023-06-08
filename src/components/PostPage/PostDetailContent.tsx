import { useRecoilState } from "recoil";
import { PostGetState } from "../../recoil/post/postGetState";

function PostDetailContent() {
  const [postData, setPostData] = useRecoilState(PostGetState);
  console.log(postData?.content);

  // 데이터가 없다면 로딩 표시를 보여줌
  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: postData?.content }} />;
      {/* 다른 컴포넌트나 요소들을 여기에 추가할 수 있습니다 */}
    </div>
  );
}

export default PostDetailContent;
