import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { ChangeEvent, useEffect } from "react";
import CommonInput from "../common/CommonInput";
import { PostTitleState } from "../../recoil/post/postCreateState";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";

const Container = styled.div`
  width: 100%;
`;

// input wrapper
const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  font-size: 14px;
  color: #949494;
`;

// common : 서브제목
export const SubInfotext = styled.div`
  font-size: 16px;
  color: #858585;
  margin-bottom: 24px;
  display: flex;
  align-items: center;

  & > p {
    margin-left: 10px;
    font-size: 12px;
  }

  @media (max-width: 375px) {
    gap: 3px;
    font-size: 15px;
  }
`;

function PostTitle() {
  const MAX_TITLE_LENGTH = 50;

  // 글 작성 - state 저장
  const [title, setTitle] = useRecoilState(PostTitleState);

  // 글 수정 - 서버에서 가져온 ate에서 keyword 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { postTitle } = getPostData || {};

  // 수정중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  // 입력 값이 변경될 때 selectePostTitleState의 상태 업데이트
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputTitle = e.target.value.slice(0, MAX_TITLE_LENGTH);
    setTitle(inputTitle);
  };

  // postIsEditing이 true일 때 초기 title 값을 postTitle로 설정
  useEffect(() => {
    if (postIsEditing && postTitle) {
      setTitle(postTitle);
    }
  }, [postIsEditing, postTitle]);

  return (
    <Container>
      <SubInfotext>
        키워드로 글을 작성하면 같이 다닐 확률이 높아져요!
        <p>[{`${title.length}/${MAX_TITLE_LENGTH}`}]</p>
      </SubInfotext>

      <InputWrapper>
        <CommonInput
          placeholder="게시글의 제목을 입력해 주세요."
          value={title} // 수정 중인 경우 postTitle을 표시하고, 아닌 경우 Recoil 상태 값을 표시
          onChange={handleTitleChange} // 입력 값 변경을 처리합니다
        />
      </InputWrapper>
    </Container>
  );
}

export default PostTitle;
