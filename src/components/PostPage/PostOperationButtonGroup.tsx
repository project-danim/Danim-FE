import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PostGetState, postIdState } from "../../recoil/post/postGetState";
import { deletePost } from "../../api/post";
import { chatStart } from "../../api/chat";
import {
  chatEnteredUsersNicknameState,
  roomNameState,
} from "../../recoil/chat/chatState";

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

  // get 메소드를 사용해 저장된 현재 글의 recoil state
  const getPostData = useRecoilValue(PostGetState);
  // 글을 작성한 사람의 닉네임
  const { nickName } = getPostData || {};
  // 현재 글에 모임을 신청한 참여자
  const { participants } = getPostData || {};
  console.log(`참여자`, participants);

  const { chatRoomId } = getPostData || {};

  // 현재 접속중인 유저의 닉네임, 아이디
  const currentUserNickname = localStorage.getItem("nickname");
  const currentUserId = Number(localStorage.getItem("id"));
  console.log(`현재 유저 아이디`, currentUserId);

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

  // 삭제 버튼 핸들러
  const handleDelete = () => {
    deletePostMutation.mutate(postId);
  };

  const setChatEnteredUsersNickname = useSetRecoilState(
    chatEnteredUsersNicknameState
  );
  const setRoomName = useSetRecoilState(roomNameState);

  // 모임 신청, 채팅방 이동
  const handleApply = async () => {
    if (chatRoomId === undefined) {
      console.error("채팅방이 존재하지 않습니다.");
      return;
    }
    const response = await chatStart(chatRoomId); // postId로 변환 줬을때 받아온 roomname
    if (response.statusCode === 200) {
      setChatEnteredUsersNickname(response.data.nickName); // 현재 참여 중인 전체 참여자 모든 유저 닉네임 받아오기
      setRoomName(response.data.roomName); // postID 를 줬을 때 받아오는 room name
      navigate(`/chat/${postId}`);
    }
  };

  const handleCancel = () => {};

  return (
    <Container>
      {participants?.includes(currentUserId) ? (
        <ApplyButton type="button" onClick={handleCancel}>
          취소하기
        </ApplyButton>
      ) : (
        <ApplyButton type="button" onClick={handleApply}>
          신청하기
        </ApplyButton>
      )}

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
