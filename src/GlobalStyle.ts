import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* reset.css */
  body {
    margin: 0;
    padding: 0;
  }
  p {
      margin: 0;
      padding : 0;
    }
    // react-datepicker 다른 요소에 가려지는것 방지
    .react-datepicker-popper {
    z-index: 3 !important; // 혹시 다른 스타일에 의해 오버라이드 되는 것을 방지하기 위해 !important를 사용하였습니다.
  }

`;
export default GlobalStyle;
