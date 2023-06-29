import { useRecoilState, useRecoilValue } from "recoil";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PostGetState, postIdState } from "../../recoil/post/postGetState";
import { deletePost } from "../../api/post";
import PostButton from "./PostApplyButton";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

// 수정 삭제 버튼
export const DeleteAddButton = styled.button`
  color: gray;
  font-size: 12px;
  background-color: transparent;
  border: none;
  cursor: pointer;
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
  @media (max-width: 375px) {
    margin: 10px;
  }
`;

function PostOperationButtonGroup() {
  const navigate = useNavigate();
  const [postId] = useRecoilState(postIdState);

  // get 메소드를 사용해 저장된 현재 글의 recoil state
  const getPostData = useRecoilValue(PostGetState);
  // 글을 작성한 사람의 닉네임
  const { nickName } = getPostData || {};
  // 현재 글에 모임을 신청한 참여자

  // 현재 접속중인 유저의 닉네임, 아이디
  const currentUserNickname = localStorage.getItem("nickname");

  // 게시물 수정
  const handleEdit = () => {
    navigate(`/edit-post/step1/${postId}`);
  };

  // 게시물 삭제
  const deletePostMutation: any = useMutation(() => deletePost(postId), {
    onSuccess: () => {
      console.log(`게시물 ${postId}를 삭제했습니다.`);
      navigate("/");
    },
    onError: (error) => {
      console.error(`게시물 삭제에 실패했습니다: ${error}`);
    },
  });

  // 삭제 버튼 핸들러
  const handleDelete = () => {
    const confirmDelete = window.confirm("게시물을 삭제하시겠습니까?");
    if (confirmDelete) {
      deletePostMutation.mutate(postId);
    }
  };

  return (
    <Container>
      <PostButton />
      {nickName === currentUserNickname ? (
        <DeleteAddButtonWrapper>
          <DeleteAddButton type="button" onClick={handleEdit}>
            수정
          </DeleteAddButton>
          <DeleteAddButtonVertical />
          <DeleteAddButton type="button" onClick={handleDelete}>
            삭제
          </DeleteAddButton>
        </DeleteAddButtonWrapper>
      ) : null}
    </Container>
  );
}

export default PostOperationButtonGroup;
