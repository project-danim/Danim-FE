import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import CommonInput from "../common/CommonInput";
import { PostTitleState } from "../../recoil/post/postCreateState";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";

const Container = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

function PostTitle() {
  // 글 작성 - state 저장
  const [title, setTitle] = useRecoilState(PostTitleState);

  // 글 수정 - 서버에서 가져온 ate에서 keyword 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { postTitle } = getPostData || {};

  // 수정중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  // 입력 값이 변경될 때 selectePostTitleState의 상태 업데이트
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <Container>
      <CommonInput
        placeholder="게시글의 제목을 입력해 주세요."
        value={postIsEditing ? postTitle : title} // 수정 중인 경우 postTitle을 표시하고, 아닌 경우 Recoil 상태 값을 표시
        onChange={handleTitleChange} // 입력 값 변경을 처리합니다
      />
    </Container>
  );
}

export default PostTitle;
