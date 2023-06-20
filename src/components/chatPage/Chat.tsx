import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
// import chatStart from "../../api/chat";
import Message from "./Message";
import st from "./ChatST";
import {
  chatEnteredUsersNicknameState,
  chatRoomChatRecordState,
  chatRoomPostTitleState,
  roomNameState,
} from "../../recoil/chat/chatState";

interface User {
  imageUrl: string;
  nickname: string;
}

let stomp: any;

function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");
  // 게시글 아이디랑 게시글 제목을 가져와야함

  // 상세 게시글 페이지에서 입장하기를 눌렀을때 저장된 recoil state 호출 - 참여자, 방이름
  const chatEnteredUsersNickname = useRecoilValue(
    chatEnteredUsersNicknameState
  );
  const chatEnteredRoomName = useRecoilValue(roomNameState);
  const chatRoomPostTitle = useRecoilValue(chatRoomPostTitleState);
  const chatRecord = useRecoilValue(chatRoomChatRecordState);
  console.log(chatRecord);

  // 현재 대화중인 사람 목록
  const conversationPeople: string[] = chatEnteredUsersNickname.map(
    (user: User) => user.nickname
  );

  // 룸 네임 ( "260c4214-6e7a-402a-af6d-96550179f6d4" 이런 형식)
  const [roomName, setRoomName] = useState("");
  // 채팅에 참여하고 있는 모든 사용자 닉네임
  const [allUserNickname, setAllUserNickname] = useState<string[]>([]);
  // 현재의 통신 객체 ref
  const stompClientRef = useRef<any>(null);
  // 유저 아이디 세션 스토리지 저장한 값으로 가져오는걸로 바꾸기
  const userId = localStorage.getItem("nickname");

  // 메세지 끝 값 참조
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 컴포넌트가 랜더링 될 때 recoil 에서 받아온 state update
  useEffect(() => {
    setAllUserNickname(conversationPeople || []);
    setRoomName(chatEnteredRoomName);
  }, []);

  console.log(allUserNickname);

  // console.log();

  // 입장하기 버튼 클릭했을때 - 상세게시글 조회에 신청하기로 이동 / 목록에서 입장하기는 추가 필요 / 목록에서도 chatState.ts recoil state 로 전달해야함
  // const handleEnterButtonClick = async () => {
  //   //
  //   const response = await chatStart(2); // postId로 변환 줬을때 받아온 roomname
  //   if (response.statusCode === 200) {
  //     setAllUserNickname(() => [...response.data.nickName]); // 현재 참여 중인 전체 참여자 모든 유저 닉네임 받아오기
  //     setRoomName(() => response.data.roomName); // postID 를 줬을 때 받아오는 room name
  //   }
  // };

  // 웹소켓 연결
  const connect = () => {
    const sock = new SockJs(`${import.meta.env.VITE_APP_URL}/ws-stomp`);
    stomp = StompJs.over(sock);
    stomp.connect(
      {},
      () => {
        stompClientRef.current = stomp;
        stomp.subscribe(`/sub/chat/room/${roomName}`, (data: any) => {
          // 구독할때 룸네임 넣어서 sub 하고
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

  // 메세지의 가장 끝으로 내려보내기
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <st.ChatPageBackground>
      {/* 상세 게시글에서 입장으로 바뀜
      <button type="button" onClick={handleEnterButtonClick}>
        입장하기
      </button> */}
      <header>
        <button type="button">뒤로가기</button>
        {/* 신청해서 받아온 게시글 제목이 있어야함  */}
        <h2>{`${chatRoomPostTitle}`}</h2>
        <st.AllUserContainer>
          <p>대화 상대</p>
          <p>{userId}</p>
          {allUserNickname.map(
            // 메세지를 map 을 돌려서 받아옴
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
      {/* 가장 아래를 참조하게 하는 ref */}
      <div ref={messagesEndRef} />

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
