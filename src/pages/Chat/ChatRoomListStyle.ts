import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  width: 50%;
  background-color: transparent;
  color: ${({ active }) => (active ? "#5C5C5C" : "#C2C2C2")};
  border: none;
  cursor: pointer;
  border-bottom: ${({ active }) =>
    active ? "11px solid #A3BF3B" : "11px solid transparent"};
`;

export const TabContent = styled.div`
  margin-top: 20px;
  width: 100%;
`;
