import styled from "styled-components";

// 공통 입력창
const CommonInput = styled.input`
  border: 0.5px solid #a3a3a3;
  font-size: 16px;
  box-sizing: border-box;
  padding: 9.5px 0;
  padding-left: 12px;
  width: 100%;
  line-height: 22px;
  border-radius: 8px;
  color: #5c5c5c;
  &:focus {
    outline: 1px solid #a3bf3b;
  }
`;

export default CommonInput;
