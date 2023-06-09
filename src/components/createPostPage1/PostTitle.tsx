import styled from "styled-components";
import CommonInput from "../common/CommonInput";

const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

function PostTitle() {
  return (
    <Container>
      <CommonInput placeholder="게시글의 제목을 입력해 주세요." />
    </Container>
  );
}

export default PostTitle;
