import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import Slider from "react-slick";

export const Container = styled.div`
  width: 100%;
`;

// 채팅 배경화면
export const ChatPageBackground = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 90px;
`;

// 제목, 대화상대 wrapper
export const TitleChatContainer = styled.div`
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
`;

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

export const Conversation = styled.div`
  color: #000;
  font-size: 14px;
  margin: 0 25px;
  min-width: 150px;
  display: flex;
  align-items: center;
`;

export const ConversationPeopleContainer = styled.div`
  display: flex;
  align-items: center;
  &:not(:first-child) {
    margin: 12px;
  }
`;

export const ConversationPeopleImg = styled.img`
  width: 24px;
  height: 24px;
  /* margin-right: 8px; */
  /* margin-left: 8px; */
  border-radius: 50%;
`;

export const ConversationPeopleLine = styled.div`
  width: 1px;
  height: 45%;
  background-color: #858585;
  /* margin-left: 12px; */
`;

export const ConversationUserNickname = styled.div`
  /* margin: 0 6px; */
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
  justify-content: center;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  color: #5c5c5c;
  font-size: 14px;
  line-height: 16px;
  & > p {
    padding: 0 12px;
  }
  & > p:nth-child(1) {
    padding: 0 47px 0 0;
  }
  & > p:nth-child(2) {
    border-right: solid 1px black;
  }
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

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 130px;
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

// 슬라이더
export const StyledSlider = styled(Slider)`
  .slick-slide > div > div {
    display: flex !important;
  }
  width: 90%;
  /* margin: o auto; */
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
