import styled from "styled-components";

// 공통 버튼 프롭 타입
// type FilterButtonProps = {
//   buttonName: string;
// } & React.ButtonHTMLAttributes<HTMLButtonElement>;

// 채팅 배경화면
const ChatPageBackground = styled.div`
  margin: 0 auto;
`;

// 채팅 내용 아티클 컨테이너 (입장 메세지 제외)
const ChatArticleContainer = styled.article`
  max-width: 970px;
  width: 100%;
  margin: 0 auto;
`;

// 대화 상대 컨테이너 (자신 포함)
const AllUserContainer = styled.div`
  padding: 29px 25px;
  box-sizing: border-box;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 8px;
  max-width: 970px;
  display: flex;
  flex-direction: row;
  & > p {
    padding: 0 12px;
  }
  & > p:nth-child(1) {
    padding: 0 47px 0 0;
  }
`;

// 채팅 입장 메세지
const EnteredUserText = styled.p`
  width: 100%;
  background-color: #9ab4d8;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
  text-align: center;
`;

// 사용자 닉네임
const UserNickname = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #5c5c5c;
  padding: 16px 12px;
  padding-right: 12px;

  // 아이콘 스타일링
  &::before {
    content: "";
    display: inline-block;
    /* 임의로 사용자 이미지 넣어놓겠습니다 -지수- */
    background-image: url("/header/user.svg");
    width: 24px;
    height: 24px;
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 8px;
    position: relative;
  }
`;

// 내 메세지 창과 시간 컨테이너
const MyChatAndTimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 16px;
`;

// 내 메세지 창
const MyChatBox = styled.p`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  background: #ffffff;
  padding: 20px 44px;
  margin: 0;
  border-radius: 30px;
`;

// 메세지 시간
const ChatTimeStamp = styled.time`
  font-family: Noto Sans KR;
  font-size: 8px;
  font-weight: 300;
  line-height: 16px;
`;

// 메세지 입력 컨테이너
const MessageInputForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  column-gap: 26px;
  width: 100%;
  max-width: 1120px;
  margin-bottom: 19px;
`;

// 메세지 입력 창
const MessageInput = styled.input`
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
const MessageSendButton = styled.button`
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

export default {
  ChatPageBackground,
  ChatArticleContainer,
  AllUserContainer,
  EnteredUserText,
  UserNickname,
  MyChatAndTimeContainer,
  MyChatBox,
  ChatTimeStamp,
  MessageInputForm,
  MessageInput,
  MessageSendButton,
};
