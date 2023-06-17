import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PostGetState } from "../../recoil/post/postGetState";

export const Container = styled.div`

  width: 100%;
  height: 100%;
  /* margin: 20; */

  img {
    max-width: 1120px;
    min-width: 25%;
    height: auto;
  }
`;

function PostDetailContent() {
  const [postData] = useRecoilState(PostGetState);

  // 데이터가 없다면 로딩 표시를 보여줌
  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: postData?.content || "" }} />
    </Container>
  );
}

export default PostDetailContent;
