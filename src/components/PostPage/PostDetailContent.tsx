import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PostGetState } from "../../recoil/post/postGetState";

export const Container = styled.div`
  /* width: 100%;
  height: 100%; */
  img {
    max-width: 1120px;
    min-width: 25%;
    height: auto;
  }
`;

function PostDetailContent() {
  const [postData, setPostData] = useRecoilState(PostGetState);

  // 데이터가 없다면 로딩 표시를 보여줌
  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: postData?.content }} />
      {/* 다른 컴포넌트나 요소들을 여기에 추가할 수 있습니다 */}
    </Container>
  );
}

export default PostDetailContent;
