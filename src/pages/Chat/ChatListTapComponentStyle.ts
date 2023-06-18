// 내가 작성한 게시물 채팅방 list 와 지원한 채팅방 리스트 style

import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;
`;

export const Date = styled.p`
  font-size: 14px;
  color: #999;
  margin-bottom: 5px;
`;

export const Author = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Content = styled.p`
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: #2e5902;
  color: white;
  border: none;
  cursor: pointer;
`;
