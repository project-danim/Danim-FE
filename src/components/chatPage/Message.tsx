import { useRecoilValue } from "recoil";
import { chatEnteredUsersNicknameState } from "../../recoil/chat/chatState";
import replaceProfileUrl from "../../../public/chat/userProfile.svg";
import * as st from "./MessageStyle";

type User = {
  nickname: string;
  imageUrl: string;
};

function Message({ msg, prevMsg, userNickname }: any) {
  //  닉네임을 표시할지에 대한 값으로 !prevMsg가 true면 이전 메세지가 없으므로 닉네임 표시 true
  //    prevMsg.sender !== msg.sender가 true면 이전 메세지와 현재 메세지의 유저가 다르므로 닉네임 표시 true
  const isDisplayNickname = !prevMsg || prevMsg?.sender !== msg?.sender;

  // 시간 변환 함수
  const getTime = (time: string) => {
    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const chatEnteredUsersNickname = useRecoilValue(
    chatEnteredUsersNicknameState
  );

  const senderUser = chatEnteredUsersNickname.find(
    (user: User) => user.nickname === msg.sender
  ) as User | undefined;

  const senderImageUrl = senderUser?.imageUrl || replaceProfileUrl;

  return (
    <section>
      {/* 채팅방 입장 메세지 */}
      {msg.type === "ENTER" && msg.sender !== null && (
        <st.EnteredUserText>{msg.message}</st.EnteredUserText>
      )}

      {/* 채팅 진행 중 메세지 */}
      {msg.type === "TALK" && msg.sender !== null && (
        <st.ChatArticleContainer>
          {msg.sender === userNickname ? (
            <div>
              {/* // 자신이 보낸 메시지인 경우 */}
              {isDisplayNickname && (
                <st.UserNickname>
                  {userNickname}
                  <st.ProfileIcon src={senderImageUrl} />
                </st.UserNickname>
              )}
              <st.MyChatAndTimeContainer>
                <st.ChatTimeStamp>{getTime(msg.time)}</st.ChatTimeStamp>
                <st.MyChatBox>{msg.message}</st.MyChatBox>
              </st.MyChatAndTimeContainer>
            </div>
          ) : (
            <>
              {/* 다른 사용자가 보낸 메시지인 경우 */}
              {isDisplayNickname && (
                <st.ParticipantsNickname>
                  <st.ProfileIcon src={senderImageUrl} />
                  {msg.sender}
                </st.ParticipantsNickname>
              )}
              <st.ParticipantsChatAndTimeContainer>
                <st.ParticipantsChatBox>{msg.message}</st.ParticipantsChatBox>
                <st.ChatTimeStamp>{getTime(msg.time)}</st.ChatTimeStamp>
              </st.ParticipantsChatAndTimeContainer>
            </>
          )}
        </st.ChatArticleContainer>
      )}
    </section>
  );
}
export default Message;
