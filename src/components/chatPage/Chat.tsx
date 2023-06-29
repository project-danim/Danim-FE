import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import Message from "./Message";
import {
  chatEnteredUsersNicknameState,
  chatRoomChatRecordState,
  chatRoomPostTitleState,
  roomNameState,
} from "../../recoil/chat/chatState";
import titleIcon from "../../../public/chat/frame.svg";
import * as st from "./ChatST";

interface User {
  imageUrl: string;
  nickname: string;
}

let stomp: any;

function Chat() {
  // 상세 게시글 페이지에서 입장하기를 눌렀을때 저장된 recoil state 호출 - 참여자, 방이름, 게시글 제목, 과거 채팅 기록
  const chatEnteredUsers = useRecoilValue(chatEnteredUsersNicknameState);
  const chatEnteredRoomName = useRecoilValue(roomNameState);
  const chatRoomPostTitle = useRecoilValue(chatRoomPostTitleState);
  const chatRecord = useRecoilValue(chatRoomChatRecordState);

  console.log(`가공전 record`, chatRecord);

  // const [imposterState, setImposterState] = useState();

  const navigate = useNavigate();

  // 👇 서버에서 받은 채팅 기록을 사용할 수 있는 형태로 가공
  let flattenedChatRecord = [];
  if (Array.isArray(chatRecord)) {
    if (chatRecord.some(Array.isArray)) {
      flattenedChatRecord = chatRecord.flat();
    } else {
      flattenedChatRecord = chatRecord;
    }
  }

  const formattedMessages = flattenedChatRecord.map((record) => {
    const formattedTime = `${record.createdAt.replace(" ", "T")}.000Z`;
    return {
      type: record.type,
      roomName: record.chatRoomName,
      sender: record.sender,
      imposter: record.imposter, // <-- 아직은 처리 안되어있음으로 null 값
      message: record.message,
      time: formattedTime,
    };
  });

  // console.log(formattedMessages);

  console.log(formattedMessages);

  // 현재 메세지 / record 메세지 (formattedMessages)
  const [messages, setMessages] = useState<any[]>(formattedMessages);
  const [messageInput, setMessageInput] = useState("");

  // console.log(messages);

  // 현재 대화중인 사람 목록
  // const conversationPeople: string[] = chatEnteredUsers.map(
  //   (user: { imageUrl: string; nickname: string }) => user.nickname
  // );
  // console.log(conversationPeople);

  // 룸 네임 ( "260c4214-6e7a-402a-af6d-96550179f6d4" 이런 형식)
  const [roomName, setRoomName] = useState("");
  // 채팅에 참여하고 있는 모든 사용자 닉네임
  // const [setAllUserNickname] = useState<string[]>([]);
  // 현재의 통신 객체 ref
  const stompClientRef = useRef<any>(null);

  // 유저 아이디 세션 스토리지 저장한 값으로 가져오는걸로 바꾸기
  const userNickname = localStorage.getItem("nickname");

  // 메세지 끝 값 참조
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 컴포넌트가 랜더링 될 때 recoil 에서 받아온 state update
  useEffect(() => {
    // setAllUserNickname(conversationPeople || []);
    setRoomName(chatEnteredRoomName);
  }, []);

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
            sender: userNickname,
            message: "",
          })
          // const imposter = JSON.parse(data.body)
          // setImposterState()
        );
      },
      (err: Error) => {
        console.log("에러발생! 연결실패!", err);
      }
    );
  };
  // 뒤로 가기 버튼
  const goBack = () => {
    navigate(-1); // 뒤로 가기
  };

  // 웹소켓 연결 해제
  // const disconnect = () => {
  //   if (stomp) {
  //     stomp.debug = null;
  //     stomp.disconnect(() => {
  //       console.log("연결 끊김");
  //     });
  //   }
  // };

  // 메세지 전송
  const sendMessage = (event: any) => {
    event.preventDefault();
    if (messageInput.trim() === "") {
      return;
    }
    const sendList = {
      sender: userNickname,
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

  // 언마운트 될때 disconnect 됨
  // useEffect(
  //   () => () => {
  //     disconnect();
  //   },
  //   []
  // );

  // 받아온 roomName이 있을때만 소켓 연결 시도
  useEffect(() => {
    if (roomName !== "") {
      connect();
    }
    // 컴포넌트에서 unmount 될때 서버로 "LEAVE" 메세지를 보냄
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.send(
          "/pub/chat/message",
          {},
          JSON.stringify({
            type: "LEAVE",
            roomName,
            sender: userNickname,
            message: "",
          })
        );
      }
    };
  }, [roomName]);

  // 닉네임 클릭시 드롭다운을 위한 state
  const [dropdownOpenState, setDropdownOpenState] = useState<{
    [key: string]: boolean;
  }>({});

  // 드롭다운 handler
  const toggleDropdown = (nickname: string) => {
    setDropdownOpenState((prevState) => {
      const newDropdownOpenState = Object.keys(prevState).reduce(
        (result, key) => ({ ...result, [key]: false }),
        {}
      );

      return { ...newDropdownOpenState, [nickname]: !prevState[nickname] };
    });
  };

  // 강퇴하기
  const kickUser = (nickname: string) => {
    if (stompClientRef.current) {
      stompClientRef.current.send(
        "/pub/chat/message",
        {},
        JSON.stringify({
          type: "KICK",
          roomName,
          sender: userNickname,
          message: "",
          imposter: nickname,
        })
      );
    }
    setDropdownOpenState((prevState) => ({ ...prevState, [nickname]: false }));
  };

  // 전체 배경 색 바꾸기
  useEffect(() => {
    document.body.style.backgroundColor = "#B0C1D9";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  // 메세지의 가장 끝으로 내려보내기 / 강퇴 멤버 검사
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });

      if (messages.length === 0) {
        return;
      }
      // 마지막 메시지가 Type : KICK 이고, 현재 사용자가 강퇴당한 경우
      const lastMessage = messages[messages.length - 1];
      if (
        lastMessage.type === "KICK" &&
        lastMessage.imposter === userNickname
      ) {
        // 메인 페이지로 이동
        navigate(-1);
      }
    }
  }, [messages]);

  // 슬라이더

  // 슬라이더 현재 인덱스 상태
  const [currentIndex, setCurrentIndex] = useState(0);

  // 슬라이더 이전 버튼 클릭 핸들러
  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // 슬라이더 다음 버튼 클릭 핸들러
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // 슬라이더에 보여질 사용자 배열
  const visibleUsers = chatEnteredUsers.slice(currentIndex, currentIndex + 6);

  return (
    <st.Container>
      <st.ChatPageBackground>
        <st.TitleChatContainer>
          <st.TitleWrapper>
            <st.GobackButton type="button" onClick={goBack}>
              <st.GobackButtonIcon />
            </st.GobackButton>
            <st.TitleIcon src={titleIcon} alt="Title Icon" />
            <st.ChatTitle>{`${chatRoomPostTitle}`}</st.ChatTitle>
          </st.TitleWrapper>
          <st.AllUserContainer>
            <st.Conversation>대화 상대</st.Conversation>
            <st.SliderContainer>
              <st.SliderButton onClick={handlePrevClick}>{"<"}</st.SliderButton>
              <st.SliderContent>
                {visibleUsers
                  .filter((user: User) => {
                    // imposter가 undefined 이거나 null이 아닌 사용자만 필터링합니다.
                    const lastMessageOfUser = messages
                      .slice()
                      .reverse()
                      .find((msg) => msg.sender === user.nickname);
                    return (
                      lastMessageOfUser?.imposter === undefined ||
                      lastMessageOfUser?.imposter === null
                    );
                  })
                  .map((user: User) => (
                    <st.ConversationPeopleContainer
                      key={uuid() + user.nickname}
                    >
                      <st.ConversationPeopleImg
                        src={user.imageUrl}
                        alt="User Avatar"
                      />

                      <st.DropdownContainer>
                        <st.ConversationUserNickname
                          onClick={() => toggleDropdown(user.nickname)}
                        >
                          {user.nickname}
                        </st.ConversationUserNickname>
                        {/* 배열의 첫번째 요소에만 오른쪽 선을 준다
                    {index === 0 && <st.ConversationPeopleLine />} */}
                        <st.DropdownContent
                          isOpen={dropdownOpenState[user.nickname]}
                        >
                          <st.KickAndMyPageButton
                            onClick={() => kickUser(user.nickname)}
                          >
                            강퇴하기
                          </st.KickAndMyPageButton>
                          <st.KickAndMyPageButton>
                            마이페이지
                          </st.KickAndMyPageButton>
                        </st.DropdownContent>
                      </st.DropdownContainer>
                    </st.ConversationPeopleContainer>
                  ))}
                {/* </st.StyledSlider> */}
              </st.SliderContent>
              <st.SliderButton onClick={handleNextClick}>{">"}</st.SliderButton>
            </st.SliderContainer>
          </st.AllUserContainer>
        </st.TitleChatContainer>

        <st.EmptyContainer>---</st.EmptyContainer>
        <st.MessageContainer>
          {/* 대화창 영역 - enter, talk 메세지 */}
          {messages.map((msg, index) => {
            // ENTER 타입의 메시지에서는 prevMsg를 null로 설정
            if (msg.type === "ENTER") {
              return (
                <Message
                  msg={msg}
                  prevMsg={null}
                  userNickname={userNickname}
                  key={`ENTER : ${uuid() + msg.time}`}
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
                userNickname={userNickname}
                key={`TALK : ${uuid() + msg.time}`}
              />
            );
          })}
        </st.MessageContainer>

        {/* 가장 아래를 참조하게 하는 ref */}
        <div ref={messagesEndRef} />
        <st.InputWrapper>
          <st.MessageInputForm onSubmit={sendMessage}>
            <st.MessageInput
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <st.MessageSendButton type="submit">전송하기</st.MessageSendButton>
          </st.MessageInputForm>
        </st.InputWrapper>
      </st.ChatPageBackground>
    </st.Container>
  );
}
export default Chat;
