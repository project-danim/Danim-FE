import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";
import Swal from "sweetalert2";
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
  memberId: number;
}

let stomp: any;

function Chat() {
  // 상세 게시글 페이지에서 입장하기를 눌렀을때 저장된 recoil state 호출 - 참여자, 방이름, 게시글 제목, 과거 채팅 기록
  const chatEnteredUsers = useRecoilValue(chatEnteredUsersNicknameState);
  const chatEnteredRoomName = useRecoilValue(roomNameState);
  const chatRoomPostTitle = useRecoilValue(chatRoomPostTitleState);
  const chatRecord = useRecoilValue(chatRoomChatRecordState);

  const navigate = useNavigate();

  // console.log(`채팅방 유저`, chatEnteredUsers);
  // console.log(chatRecord);

  // 임포스터 배열
  const [imposters, setImposters] = useState<any[]>([]);

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
      imposter: record.imposter,
      message: record.message,
      time: formattedTime,
    };
  });

  // 현재 메세지 / record 메세지 (formattedMessages)
  const [messages, setMessages] = useState<any[]>(formattedMessages);
  const [messageInput, setMessageInput] = useState("");

  // 룸 네임 ( "260c4214-6e7a-402a-af6d-96550179f6d4" 이런 형식)
  const [roomName, setRoomName] = useState("");

  // 현재의 통신 객체 ref
  const stompClientRef = useRef<any>(null);

  // 유저 아이디 세션 스토리지 저장한 값으로 가져오는걸로 바꾸기
  const userNickname = localStorage.getItem("nickname");

  // 메세지 끝 값 참조
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 컴포넌트가 랜더링 될 때 recoil 에서 받아온 state update
  useEffect(() => {
    setRoomName(chatEnteredRoomName);
  }, []);

  // 웹소켓 연결
  const connect = () => {
    const sock = new SockJs(`${import.meta.env.VITE_APP_URL}/ws-stomp`);
    stomp = StompJs.over(sock);
    stomp.connect(
      {},
      () => {
        stomp.debug = null;
        stompClientRef.current = stomp;
        stomp.subscribe(`/sub/chat/room/${roomName}`, (data: any) => {
          // 구독할때 룸네임 넣어서 sub 하고
          const newMessage = JSON.parse(data.body);

          // Imposters 값을 state에 저장
          if (newMessage.imposters) {
            setImposters(newMessage.imposters);
          }

          // 새로운 메시지가 imposter 정보를 담고 있다면 imposters state를 업데이트
          if (newMessage.imposter) {
            setImposters((prevImposters) => [
              ...prevImposters,
              newMessage.imposter,
            ]);
          }
          // 과거의 메세지와 현재 메세지 추가
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
  const kickUser = async (nickname: string) => {
    const confirmKick = await Swal.fire({
      title: `${nickname}님을 강퇴하시겠습니까?`,
      text: "강퇴하기는 취소 불가능 합니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#A3BF3B",
      cancelButtonColor: "#d33",
      confirmButtonText: "네, 강퇴하겠습니다",
      cancelButtonText: "아니요",
    });

    if (confirmKick.isConfirmed) {
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

  // 메세지의 가장 끝으로 내려보내기 / 접근 유저 중 강퇴 멤버 검사
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
        Swal.fire({
          title: "Error",
          text: "강퇴 당하셨습니다. 해당 모임으로는 재 입장하실 수 없습니다.",
          icon: "error",
          confirmButtonColor: "#A3BF3B",
        });

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
  const visibleUsers: User[] =
    Array.isArray(chatEnteredUsers) && chatEnteredUsers.length > 0
      ? chatEnteredUsers.slice(currentIndex, currentIndex + 6)
      : [];

  // 강퇴하기 버튼을 보여주거나 보여주지 않는 state
  const [isKickButtonVisible, setKickButtonVisible] = useState(false);

  useEffect(() => {
    if (!Array.isArray(visibleUsers) || visibleUsers.length === 0) {
      return;
    }

    setKickButtonVisible(userNickname === visibleUsers[0].nickname);
  }, [visibleUsers, userNickname]);

  const navigateToUserPage = (userId: number) => {
    navigate(`/myPage/${userId}`);
  };

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
                  .filter((user: User) => !imposters.includes(user.nickname))
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
                        <st.DropdownContent
                          isOpen={dropdownOpenState[user.nickname]}
                          isKickButtonVisible={isKickButtonVisible}
                        >
                          {isKickButtonVisible && (
                            <st.KickAndMyPageButton
                              onClick={() => kickUser(user.nickname)}
                            >
                              강퇴하기
                            </st.KickAndMyPageButton>
                          )}

                          <st.KickAndMyPageButton
                            onClick={() => navigateToUserPage(user.memberId)}
                          >
                            유저프로필
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
