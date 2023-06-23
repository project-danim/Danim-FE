import styled from "styled-components";

// 채팅 내용 아티클 컨테이너 (입장 메세지 제외)
export const ChatArticleContainer = styled.article`
  width: 90%;
  margin: 0 auto;
`;

// chat - 채팅 입장 메세지
export const EnteredUserText = styled.p`
  width: 100%;
  background-color: #9ab4d8;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
  text-align: center;
`;

// 사용자 닉네임
export const UserNickname = styled.p`
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
`;

export const ProfileIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  margin-left: 8px;
  border-radius: 50%;
`;

// 내 메세지 창과 시간 컨테이너
export const MyChatAndTimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 16px;
`;

// 내 메세지 창
export const MyChatBox = styled.p`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  background: #ffffff;
  padding: 12px;
  margin-right: 40px;
  border-radius: 8px;
`;

// 메세지 시간
export const ChatTimeStamp = styled.time`
  font-family: Noto Sans KR;
  font-size: 8px;
  font-weight: 300;
  line-height: 16px;
  margin: 0 5px;
`;

// 참여자 닉네임
export const ParticipantsNickname = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: #5c5c5c;
  padding: 16px 12px;
  padding-right: 12px;
`;

// 참여자 메세지 창
export const ParticipantsChatBox = styled.p`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  background: #ffffff;
  padding: 12px;
  margin-left: 40px;
  border-radius: 8px;
`;

// 참여자 메세지 창과 시간 컨테이너
export const ParticipantsChatAndTimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 16px;
`;
