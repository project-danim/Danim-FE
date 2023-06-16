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

// 임의로 프롭에 대한 타입 지정 코드 넣어놓음 -지수-
// interface PostDetailContentProps {
//   postData: {
//     content?: string;
//   };
// }

// 원래 코드
// function PostDetailContent() {

// 타입 지정 때문에 수정한 코드 -지수-
function PostDetailContent() {
  const [postData] = useRecoilState(PostGetState);

  // 데이터가 없다면 로딩 표시를 보여줌
  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {/* 원래 코드 */}
      {/* <div dangerouslySetInnerHTML={{ __html: postData?.content }} /> */}

      {/* string 혹은 null이 아닌 string 혹은 빈 문자열임을 위해 수정한 코드 -지수- */}
      <div dangerouslySetInnerHTML={{ __html: postData?.content || "" }} />
      {/* 다른 컴포넌트나 요소들을 여기에 추가할 수 있습니다 */}
    </Container>
  );
}

export default PostDetailContent;
