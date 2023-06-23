import styled from "styled-components";

const CommonButton = styled.button<any>`
  font-size: 16px;
  line-height: 22px;
  padding: 10px 17.5px;
  box-sizing: border-box;
  width: 100%;
  /* max-width: 110px; */
  color: 5C5C5C;
  background-color: ${(props) =>
    props.bgColor || "var(--button-6-default-color)"};
  border: none;
  border-radius: 8px;
  font-weight: 400;
  &:hover {
    cursor: pointer;
    background-color: var(--button-6-hover-color);
  }
  /* @media (max-width: 1400px) and (min-width: 320px) {
font-size: 11px;
padding: 8px 11px;
line-height: 15px;
} */
`;

export default CommonButton;
