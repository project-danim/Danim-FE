import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 120px;
`;

// 버튼 Wrapper
export const TabButtonWrapper = styled.div`
  width: 100%;
  border-bottom: 0.25px solid #c2c2c2;
`;

// 탭 버튼
export const TabButton = styled.button<{ active: boolean }>`
  font-size: 16px;
  padding: 30px 10px;
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
