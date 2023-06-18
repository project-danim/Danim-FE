import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  width: 50%;
  background-color: transparent;
  color: ${({ active }) => (active ? "#A3BF3B" : "#C2C2C2")};
  border: none;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? "11px" : "none")};
`;

export const TabContent = styled.div`
  margin-top: 20px;
  width: 100%;
`;
