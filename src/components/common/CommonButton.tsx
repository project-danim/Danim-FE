import styled from "styled-components";

const CommonButton = styled.button`
  font-size: 16px;
  line-height: 22px;
  padding: 10px 17.5px;
  box-sizing: border-box;
  width: 100%;
  /* max-width: 110px; */
  color: #ffffff;
  background-color: #a3bf3b;
  border: none;
  border-radius: 8px;
  font-weight: 400;
  &:hover {
    cursor: pointer;
  }
  /* @media (max-width: 1400px) and (min-width: 320px) {
font-size: 11px;
padding: 8px 11px;
line-height: 15px;
} */
`;

export default CommonButton;
