import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";

// 드롭다운을 위한 interface
interface DropdownContentProps {
  isOpen: boolean;
}

export const Container = styled.div`
  width: 100%;
`;

// 채팅 배경화면
export const ChatPageBackground = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 90px;
`;

// 채팅창 위의 공백을 위한 container
export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 130px;
`;

// 뒤로가기 아이콘
export const GobackButtonIcon = styled(BiArrowBack)`
  background-color: transparent;
  height: 24px;
  width: 24px;
  margin: 20px;
`;

// 뒤로가기 버튼
export const GobackButton = styled.button`
  background-color: transparent;
  border: none;
`;

// 제목 아이콘
export const TitleIcon = styled.img`
  width: 24px;
  height: 24px;
`;

// 채팅방 제목
export const ChatTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-left: 8px;
`;

// 제목, 대화상대 wrapper
export const TitleChatContainer = styled.div`
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
`;
//
export const MessageContainer = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
`;

// 제목 wrapper
export const TitleWrapper = styled.div`
  max-width: 1120px;
  width: 100%;
  display: flex;
  align-items: center;
  height: 75px;
  background-color: #b0c1d9;
`;

// 슬라이더 👉
export const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 30px;
`;

// 슬라이더 content 내용
export const SliderContent = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  margin: 0 10px;
  flex-grow: 1;
  transition: transform 1ms ease-in-out;
`;

// 슬라이더 버튼
export const SliderButton = styled.div`
  border: none;
  margin-bottom: 3px;
  font-size: 20px;
  color: #858585;
`;

// 대화에 참여중인 사람들 container
export const ConversationPeopleContainer = styled.div`
  display: flex;
  align-items: center;
  /* margin: 12px; */
  /* min-width: 200px; */
  /* width: 90%; */
`;

// 대화 상대 text wrapper
export const Conversation = styled.div`
  color: #000;
  font-size: 14px;
  min-width: 70px;
  margin-left: 25px;
  display: flex;
  justify-content: center;
`;

// 대화상대 profile
export const ConversationPeopleImg = styled.img`
  width: 24px;
  height: 24px;
  margin: 0 8px;
  border-radius: 50%;
`;

// 대화상대 구분 선
// export const ConversationPeopleLine = styled.div`
//   width: 1px;
//   height: 45%;
//   background-color: #858585;
//   /* margin-left: 12px; */
// `;

// 프로필 클릭시 드롭다운 container
export const DropdownContainer = styled.div`
  position: relative;
  /* display: inline-block; */
`;

// 대화 중인 유저 - 드롭다운을 위한 버튼
export const ConversationUserNickname = styled.button`
  cursor: pointer;
  display: flex;
  font-size: 14px;
  border: none;
  background-color: transparent;
`;

// 드롭다운 컨텐츠
export const DropdownContent = styled.div<DropdownContentProps>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  padding: 4px 8px;
  top: 30px;
  left: 0;
  background-color: gray;
  width: 78px;
  height: 82px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
`;

// 강퇴하기, 마이페이지 버튼
export const KickAndMyPageButton = styled.button`
  border: none;
  background-color: #f5f5f5;
  display: flex;
  width: 77px;
  padding: 8px;
  margin: 6px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 14px;
`;

// 대화 상대 컨테이너 (자신 포함)
export const AllUserContainer = styled.div`
  max-width: 1120px;
  height: 73px;
  width: 70%;
  box-sizing: border-box;
  background-color: #ffffff;
  margin: 0 auto;
  align-items: center;
  justify-content: flex-start;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  color: #5c5c5c;
  font-size: 14px;
  line-height: 16px;
`;

// 텍스트 입력창을 위한 wrapper
export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

// 메세지 입력 컨테이너
export const MessageInputForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  bottom: 0;
  column-gap: 26px;
  width: 100%;
  max-width: 1120px;
  margin-bottom: 19px;
  /* margin: 0 auto; */
`;

// 메세지 입력 창
export const MessageInput = styled.input`
  width: 100%;
  line-height: 19.9px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  padding: 19px 20px;
  box-sizing: border-box;
  border: none;
`;

// 메세지 전송 버튼
export const MessageSendButton = styled.button`
  background-color: #7ea8e3;
  background-image: url("/chat/sendButton.svg");
  background-repeat: no-repeat;
  background-size: 24px;
  background-position: center;
  border-radius: 8px;
  width: 58px;
  height: 58px;
  text-indent: -9999px;
  border: none;
  cursor: pointer;
`;
