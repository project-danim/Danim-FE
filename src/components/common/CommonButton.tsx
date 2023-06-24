import styled from "styled-components";

const CommonButton = styled.button<any>`
  font-size: 16px;
  line-height: 22px;
  padding: 10px 17.5px;
  box-sizing: border-box;
  width: 100%;
  color: 5C5C5C;
  background-color: ${(props) => props.bgColor || props.bgColor};
  border: none;
  border-radius: 8px;
  font-weight: 400;
  &:hover {
    cursor: pointer;
    background-color: var(--button-6-hover-color);
  }
  &:active {
    background-color: var(--button-6-pressed-color);
  }
`;

export default CommonButton;
