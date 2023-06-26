import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { PostGetState, postIdState } from "../../recoil/post/postGetState";
import { cancelApply, chatStart } from "../../api/chat";
import {
  chatEnteredUsersNicknameState,
  chatRoomChatRecordState,
  chatRoomPostTitleState,
  roomNameState,
} from "../../recoil/chat/chatState";

// 신청하기 버튼
export const StyledButton = styled.button`
  height: 112px;
  width: 112px;
  border-radius: 20px;
  background-color: var(--button-1-default-color);
  color: white;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: var(--button-1-default-color);
    border: 2px solid var(--button-1-hover-outline-color);
  }
  &:active {
    background-color: var(--button-1-pressed-color);
  }
  @media (max-width: 375px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-radius: 8px;
    width: 350px;
    margin: 5px;
  }
`;

function PostButton() {
  const navigate = useNavigate();
  // 현재 게시글에 대한 정보
  const getPostData = useRecoilValue(PostGetState);

  // 글을 작성한 사람의 닉네임
  const { nickName } = getPostData || {};
  // 현재 접속중인 유저의 닉네임
  const currentUserNickname = localStorage.getItem("nickname");
  // 1. 사용자가 게시글의 작성자인지 판별
  const isAuthor = currentUserNickname === nickName;

  // 현재 글에 모임을 신청한 참여자
  const { participants } = getPostData || {};
  // 현재 접속중인 유저의 Id
  const currentUserId = Number(localStorage.getItem("id"));
  // 2. 사용자가 신청자인지 판별
  const isApplicant = participants?.includes(currentUserId);

  // 모집 마감일
  const { recruitmentEndDate } = getPostData || {};
  // 게시글이 만료되었는지 판별
  const adjustedEndDate = new Date(recruitmentEndDate);
  adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

  const isExpired = new Date() > adjustedEndDate;

  // 신청하려는 모임의 채팅방 Id
  const { chatRoomId } = getPostData || {};
  // [채팅 방으로 보내기 위한 recoil state - 참여한 유저 닉네임, 채팅방 이름, 게시글 제목, 현재 유저의 채팅방의 이전 채팅 기록]
  const setChatEnteredUsersNickname = useSetRecoilState(
    chatEnteredUsersNicknameState
  );
  const setRoomName = useSetRecoilState(roomNameState);
  const setChatRoomPostTitle = useSetRecoilState(chatRoomPostTitleState);
  const setChatRoomChatRecordState = useSetRecoilState(chatRoomChatRecordState);

  // 신청하려는 모임의 채팅방 Id
  const { postTitle } = getPostData || {};
  const [postId] = useRecoilState(postIdState);

  // 신청하려는 모임이 다 찼을 때
  const { isComplete } = getPostData || {};

  // 일반 유저 : 모임 신청 -> 채팅방 이동 / 게시글 작성자 : 채팅방 이동
  const handleApplyAndChat = async () => {
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

  const queryClient = useQueryClient();
  // 취소 mutation
  const handleCancelMutation = useMutation(
    async () => {
      if (chatRoomId === undefined) {
        throw new Error("채팅방이 존재하지 않습니다.");
      }
      const response = await cancelApply(chatRoomId);
      return response;
    },
    {
      onSuccess: (data) => {
        alert("취소가 완료되었습니다.");
        console.log(data);
      },
      onError: (error) => {
        console.error("취소하기에 실패했습니다:", error);
      },
      onSettled: () => {
        queryClient.invalidateQueries("post");
      },
    }
  );

  // 모임 참여 취소
  const handleCancel = async () => {
    handleCancelMutation.mutate();
  };

  let buttonText = "";
  let buttonAction = () => {};

  if (isApplicant) {
    buttonText = "취소하기";
    buttonAction = handleCancel;
  } else if (isAuthor) {
    buttonText = "대화하기";
    buttonAction = handleApplyAndChat;
  } else if (isComplete) {
    buttonText = "모집완료";
    buttonAction = () =>
      alert(`모집이 완료된 방입니다. 다른 모임을 찾아보세요.`);
  } else if (!isAuthor && !isApplicant && !isExpired) {
    buttonText = "신청하기";
    buttonAction = handleApplyAndChat;
  } else {
    buttonText = "기간만료";
    buttonAction = () =>
      alert(`모집 기간이 지났습니다. 다른 모임을 찾아보세요.`);
  }

  return (
    <StyledButton type="button" onClick={buttonAction}>
      {buttonText}
    </StyledButton>
  );
}

export default PostButton;
