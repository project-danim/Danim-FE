import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PostGetState, postIdState } from "../../recoil/post/postGetState";
import { deletePost } from "../../api/post";
import { cancelApply, chatStart } from "../../api/chat";
import {
  chatEnteredUsersNicknameState,
  chatRoomChatRecordState,
  chatRoomPostTitleState,
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
  const { chatRoomId } = getPostData || {};

  // 현재 접속중인 유저의 닉네임, 아이디
  const currentUserNickname = localStorage.getItem("nickname");
  const currentUserId = Number(localStorage.getItem("id"));

  const navigate = useNavigate();

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

  // 게시글 제목을 꺼내오기 위한 recoil state
  const postData = useRecoilValue(PostGetState);
  const postTitle = postData?.postTitle;

  // [채팅 방으로 보내기 위한 recoil state - 참여한 유저 닉네임, 채팅방 이름, 게시글 제목]
  // 현재 채팅방에 참여한 유저들의 닉네임
  const setChatEnteredUsersNickname = useSetRecoilState(
    chatEnteredUsersNicknameState
  );
  // 버튼을 통해 접근하게 되는 채팅방 이름
  const setRoomName = useSetRecoilState(roomNameState);
  const setChatRoomPostTitle = useSetRecoilState(chatRoomPostTitleState);
  const setChatRoomChatRecordState = useSetRecoilState(chatRoomChatRecordState);

  // 모임 신청 -> 채팅방 이동
  const handleApply = async () => {
    try {
      if (chatRoomId === undefined) {
        console.error("채팅방이 존재하지 않습니다.");
        return;
      }
      const response = await chatStart(chatRoomId); // postId로 변환 줬을때 받아온 roomname
      if (response.statusCode === 200) {
        setChatEnteredUsersNickname(response.data.userInfo); // 현재 참여 중인 전체 참여자 모든 유저 닉네임 받아오기
        setRoomName(response.data.roomName); // postID 를 줬을 때 받아오는 room name
        setChatRoomPostTitle(postTitle || "");
        setChatRoomChatRecordState(response.data.chatRecord);
        navigate(`/chat/${postId}`);
      }
    } catch (error: any) {
      // 유저가 로그인 하지 않았을때 처리
      if (error.response.status === 403) {
        navigate("/");
      } else {
        console.error(error);
      }
    }
  };

  // 모임 참여 취소
  const handleCancel = async () => {
    try {
      if (chatRoomId === undefined) {
        console.error("채팅방이 존재하지 않습니다.");
        return;
      }

      const response = await cancelApply(chatRoomId);

      console.log(response);
    } catch (error) {
      console.error("취소하기에 실패했습니다:", error);
    }
  };

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
