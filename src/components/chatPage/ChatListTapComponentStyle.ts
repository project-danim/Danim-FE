// 내가 작성한 게시물 채팅방 list 와 지원한 채팅방 리스트 style

import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  width: 95%;
  align-items: center;
`;

// 채팅방 리스트 컨테이너
export const ChatRoomContainer = styled.div`
  height: 150px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
`;

export const ChatRoomWrapper = styled.div`
  width: 95%;
  /* border: 1px solid black; */
  margin: 20px;
`;

// 메세지, 메세지 작성자 wrapper
export const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 6px;
  height: 56px;
  background-color: white;
`;

// 게시글 제목, 날짜 wrapper
export const TitleDateWrapper = styled.div`
  width: 88%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* margin: 30px 13px; */
`;

// 글 제목
export const Title = styled.div`
  font-size: 20px;
  font-size: 16px;
  font-weight: 700;
  margin-left: 3px;
  margin-bottom: 33px;
`;

// 마지막 메세지 시간
export const Date = styled.div`
  font-size: 12px;
  color: #999;
`;

// 대화내용, 대화하기 버튼
export const ChatContentsChatWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

// 마지막 메세지 작성자
export const Author = styled.p`
  font-size: 12px;
  margin-left: 30px;
  color: #858585;
`;

// 메세지 내용
export const Content = styled.p`
  font-size: 14px;
  margin-left: 30px;
  color: #5c5c5c;
`;

// 대화하기 버튼
export const ChatButton = styled.button`
  padding: 10px 12px;
  width: 100px;
  height: 56px;
  background-color: #2e5902;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
`;
