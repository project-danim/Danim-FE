import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getMyPostChatRoomList } from "../../api/chat";
import * as Styled from "./ChatListTapComponentStyle";
import convertDateFormat from "../../utils/convertDateFormat";

function MyPostChatList() {
  const navigate = useNavigate();
  const {
    data: chatLists,
    isLoading,
    isError,
  } = useQuery("myPostChatRoomList", getMyPostChatRoomList);
  console.log(chatLists);

  // 대화하기 버튼 - 채팅창으로 이동
  const handleClick = (room: { roomName: string; roomId: string }) => {
    navigate(`/chat/${room.roomId}`);
  };

  if (isLoading) {
    return <div>로딩중 입니다</div>;
  }

  if (isError) {
    return <div>데이터를 불러오는 도중 문제가 발생했습니다.</div>;
  }

  return (
    <Styled.Container>
      {chatLists.data.map((chat: any) => (
        <Styled.ChatRoomContainer key={chat.roomId}>
          <Styled.ChatRoomWrapper>
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
            <Styled.ChatContentsChatWrapper>
              {chat.lastMessage ? (
                <Styled.MessageWrapper>
                  <Styled.Author>{chat.lastMessage.sender}</Styled.Author>
                  <Styled.Content>{chat.lastMessage.message}</Styled.Content>
                </Styled.MessageWrapper>
              ) : (
                <Styled.MessageWrapper>
                  <Styled.Author />
                  대화가 시작되지 않았습니다.
                </Styled.MessageWrapper>
              )}
              {/* <Styled.Button onClick={() => handleClick(chat.id)}>버튼</Styled.Button> */}
              <Styled.ChatButton
                onClick={() =>
                  handleClick({ roomName: chat.roomName, roomId: chat.roomId })
                }
              >
                대화하기
              </Styled.ChatButton>
            </Styled.ChatContentsChatWrapper>
          </Styled.ChatRoomWrapper>
        </Styled.ChatRoomContainer>
      ))}
    </Styled.Container>
  );
}

export default MyPostChatList;
