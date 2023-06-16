import { useRecoilState } from "recoil";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { postIdState } from "../../recoil/post/postGetState";
import { deletePost } from "../../api/post";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

// 신청하기 버튼
export const ApplyButton = styled.button`
  height: 112px;
  width: 112px;
  border-radius: 20px;
  background-color: #2e5902;
  color: white;
  border: none;
`;

// 수정 삭제 버튼
export const DeleteAddButton = styled.button`
  color: gray;
  font-size: 12px;
  background-color: transparent;
  border: none;
`;

// 수정 | 삭제 - 세로선
export const DeleteAddButtonVertical = styled.div`
  border-left: 1px solid black;
  height: 100%;
  margin: 0 5px;
`;

// 수정 삭제 wrapper
export const DeleteAddButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  height: 13px;
`;

function PostOperationButtonGroup() {
  const [postId] = useRecoilState(postIdState);
  const navigate = useNavigate();

  // 게시물 수정
  const handleEdit = () => {
    navigate(`/edit-post/step1/${postId}`);
  };

  // 게시물 삭제
  // 함수 타입 any 좀 넣어놓겠습니다. . .
  const deletePostMutation: any = useMutation(() => deletePost(postId), {
    onSuccess: () => {
      console.log(`게시물 ${postId}를 삭제했습니다.`);
      navigate("/home");
    },
    onError: (error) => {
      console.error(`게시물 삭제에 실패했습니다: ${error}`);
    },
  });

  const handleDelete = () => {
    deletePostMutation.mutate(postId);
  };

  // 모임 신청
  const handleApply = () => {};

  return (
    <Container>
      <ApplyButton type="button" onClick={handleApply}>
        신청하기
      </ApplyButton>
      <DeleteAddButtonWrapper>
        {" "}
        <DeleteAddButton type="button" onClick={handleEdit}>
          수정
        </DeleteAddButton>
        <DeleteAddButtonVertical />
        <DeleteAddButton type="button" onClick={handleDelete}>
          삭제
        </DeleteAddButton>
      </DeleteAddButtonWrapper>
    </Container>
  );
}

export default PostOperationButtonGroup;
