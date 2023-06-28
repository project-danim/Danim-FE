import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
// import { useEffect } from "react";
import { chatStart, getMyjoinChatRoomList } from "../../api/chat";
import * as Styled from "./ChatListTapComponentStyle";
import convertDateFormat from "../../utils/convertDateFormat";
import {
  chatEnteredUsersNicknameState,
  chatRoomChatRecordState,
  chatRoomPostTitleState,
  roomNameState,
} from "../../recoil/chat/chatState";
import getAlarmCount from "../../utils/getAlarmCount";

function AppliedChatList() {
  const navigate = useNavigate();
  const {
    data: chatLists,
    isLoading,
    isError,
  } = useQuery("AppliedChatList", getMyjoinChatRoomList);
  // console.log(chatLists);

  // 현재 채팅방에 참여한 유저들의 닉네임
  const setChatEnteredUsersNickname = useSetRecoilState(
    chatEnteredUsersNicknameState
  );
  // 현재 참여한 채팅방 이름
  const setRoomName = useSetRecoilState(roomNameState);
  // 게시글 제목
  const setPostTitle = useSetRecoilState(chatRoomPostTitleState);
  const setChatRoomChatRecordState = useSetRecoilState(chatRoomChatRecordState);

  // 대화하기 버튼 클릭시 입장
  const handleClick = async ({
    chatRoomId,
    postTitle,
  }: {
    chatRoomId: number;
    postTitle: string;
  }) => {
    if (chatRoomId === undefined) {
      console.error("채팅방이 존재하지 않습니다.");
      return;
    }
    const response = await chatStart(chatRoomId); // postId로 변환 줬을때 받아온 roomname
    if (response.statusCode === 200) {
      setChatEnteredUsersNickname(response.data.userInfo); // 현재 참여 중인 전체 참여자 모든 유저 닉네임 받아오기
      setRoomName(response.data.roomName); // postID 를 줬을 때 받아오는 room name
      setPostTitle(postTitle);
      setChatRoomChatRecordState(response.data.chatRecord);
      navigate(`/chat/${chatRoomId}`);
    }
  };

  if (isLoading) {
    return <div>로딩중 입니다</div>;
  }

  if (isError) {
    return <div>데이터를 불러오는 도중 문제가 발생했습니다.</div>;
  }

  return (
    <div>
      <Styled.Container>
        {chatLists.data.map((chat: any) => {
          // roomId 값을 가져와 useAlarmCount 훅에 전달하여 변화 감지
          // useAlarmCount(chat.roomId);
          // 70번 주석처리하기 위해 임의로 콘솔 넣었습니다.
          console.log("hhs");
          return (
            <Styled.ChatRoomContainer key={chat.roomId}>
              <Styled.ChatRoomWrapper>
                <Styled.TitleDateAlarmWrapper>
                  <Styled.TitleDateWrapper>
                    <Styled.Title>{chat.postTitle}</Styled.Title>
                    <Styled.Date>
                      {(chat.lastMessage?.createdAt &&
                        `작성일 | ${convertDateFormat(
                          new Date(chat.lastMessage.createdAt)
                        )}`) ||
                        null}
                    </Styled.Date>
                  </Styled.TitleDateWrapper>
                  <Styled.ChatAlarm hasNewChat={getAlarmCount(chat.roomId)}>
                    {getAlarmCount(chat.roomId)
                      ? `${getAlarmCount(chat.roomId)}개`
                      : null}
                  </Styled.ChatAlarm>
                </Styled.TitleDateAlarmWrapper>
                <Styled.ChatContentsChatWrapper>
                  {chat.lastMessage ? (
                    <Styled.MessageWrapper>
                      <Styled.Author>{chat.lastMessage.sender}</Styled.Author>
                      <Styled.Content>
                        {chat.lastMessage.message}
                      </Styled.Content>
                    </Styled.MessageWrapper>
                  ) : (
                    <Styled.MessageWrapper>
                      <Styled.Author />
                      대화가 시작되지 않았습니다.
                    </Styled.MessageWrapper>
                  )}
                  <Styled.ChatButton
                    onClick={() =>
                      handleClick({
                        chatRoomId: chat.roomId,
                        postTitle: chat.postTitle,
                      })
                    }
                  >
                    대화하기
                  </Styled.ChatButton>
                </Styled.ChatContentsChatWrapper>
              </Styled.ChatRoomWrapper>
            </Styled.ChatRoomContainer>
          );
        })}
      </Styled.Container>
    </div>
  );
}

export default AppliedChatList;
