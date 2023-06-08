import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CircleNumbering = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #2e5902;
  color: #ffffff;
  text-align: center;
  font-size: 16px;
  font-family: "Pridi", serif;
`;

export const MainInfoContext = styled.span`
  font-size: 16px;
`;

export const Container = styled.div`
  /* 전체 컨테이너에 대한 스타일 작성 */
`;
