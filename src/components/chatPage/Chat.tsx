import { useState, useEffect, useRef } from "react";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
import chatStart from "../../api/chat";
import Message from "./Message";
import st from "./ChatST";

let stomp: any;

function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");
  // 게시글 아이디랑 게시글 제목을 가져와야함

  // 룸 네임 ( "260c4214-6e7a-402a-af6d-96550179f6d4" 이런 형식)
  const [roomName, setRoomName] = useState("");
  // 채팅에 참여하고 있는 모든 사용자 닉네임
  const [allUserNickname, setAllUserNickname] = useState<string[]>([]);
  // 현재의 통신 객체 ref
  const stompClientRef = useRef<any>(null);
  // 유저 아이디 세션 스토리지 저장한 값으로 가져오는걸로 바꾸기
  // const userId = sessionStorage.getItem("nickname");
  const userId = "test01";

  // 입장하기 버튼 클릭했을때
  const handleEnterButtonClick = async () => {
    const response = await chatStart(1);
    if (response.statusCode === 200) {
      setAllUserNickname(() => [...response.data.nickName]);
      setRoomName(() => response.data.roomName);
    }
  };

  // 웹소켓 연결
  const connect = () => {
    const sock = new SockJs(`${import.meta.env.VITE_APP_URL}/ws-stomp`);
    stomp = StompJs.over(sock);
    stomp.connect(
      {},
      () => {
        stompClientRef.current = stomp;
        stomp.subscribe(`/sub/chat/room/${roomName}`, (data: any) => {
          const newMessage = JSON.parse(data.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
        stomp.send(
          "/pub/chat/message",
          {},
          JSON.stringify({
            type: "ENTER",
            roomName,
            sender: userId,
            message: "",
          })
        );
      },
      (err: Error) => {
        console.log("에러발생! 연결실패!", err);
      }
    );
  };

  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stomp) {
      stomp.debug = null;
      stomp.disconnect(() => {
        console.log("연결 끊김");
      });
    }
  };

  // 메세지 전송
  const sendMessage = (event: any) => {
    event.preventDefault();
    if (messageInput.trim() === "") {
      // console.log("내용을 입력해주세요.");
      return;
    }
    const sendList = {
      sender: userId,
      type: "TALK",
      message: messageInput.trim(),
      roomName,
    };
    stompClientRef.current.send(
      "/pub/chat/message",
      {},
      JSON.stringify(sendList)
    );
    setMessageInput("");
  };

  useEffect(
    () => () => {
      disconnect();
    },
    []
  );

  // 받아온 roomName이 있을때만 소켓 연결 시도
  useEffect(() => {
    if (roomName !== "") {
      connect();
    }
  }, [roomName]);

  // 전체 배경 색 바꾸기
  useEffect(() => {
    document.body.style.backgroundColor = "#B0C1D9";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <st.ChatPageBackground>
      <button type="button" onClick={handleEnterButtonClick}>
        입장하기
      </button>
      <header>
        <button type="button">뒤로가기</button>
        <h2>강남역에서 삼결살 같이 드실 분</h2>
        <st.AllUserContainer>
          <p>대화 상대</p>
          <p>{userId}</p>
          {allUserNickname.map(
            (nickname) =>
              nickname !== userId && <p key={nickname}>{nickname}</p>
          )}
        </st.AllUserContainer>
      </header>
      {messages.map((msg, index) => {
        // ENTER 타입의 메시지에서는 prevMsg를 null로 설정
        if (msg.type === "ENTER") {
          return (
            <Message
              msg={msg}
              prevMsg={null}
              userNickname={userId}
              key={msg.time}
            />
          );
        }
        // TALK 타입의 메시지에서는 이전 TALK 타입의 메시지를 찾음
        const prevMsg = messages
          // 현재 메세지 제외한 메세지들을 배열로 만들기
          .slice(0, index)
          // 뒤집어서 가장 마지막의 메세지 타입을 확인 -> 가장 마지막 메세지가 TALK면 prev=true
          .reverse()
          .find((m) => m.type === "TALK");
        return (
          <Message
            msg={msg}
            prevMsg={prevMsg}
            userNickname={userId}
            key={msg.time}
          />
        );
      })}

      <st.MessageInputForm onSubmit={sendMessage}>
        <st.MessageInput
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <st.MessageSendButton type="submit">전송하기</st.MessageSendButton>
      </st.MessageInputForm>
    </st.ChatPageBackground>
  );
}
export default Chat;
