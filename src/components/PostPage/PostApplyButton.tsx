import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
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
  background-color: #2e5902;
  color: white;
  border: none;
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
  const isExpired = new Date() > new Date(recruitmentEndDate);

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

  let buttonText = "";
  let buttonAction = () => {};

  if (isAuthor) {
    buttonText = "대화하기";
    buttonAction = handleApplyAndChat;
  } else if (isApplicant) {
    buttonText = "취소하기";
    buttonAction = handleCancel;
  } else if (!isAuthor && !isApplicant && !isExpired) {
    buttonText = "신청하기";
    buttonAction = handleApplyAndChat;
  } else {
    buttonText = "모집완료";
  }

  return (
    <StyledButton type="button" onClick={buttonAction}>
      {buttonText}
    </StyledButton>
  );
}

export default PostButton;
