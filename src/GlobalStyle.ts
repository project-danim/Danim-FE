import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* pretendard 폰트 설정 */
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  /* reset.css */ 
  body {
    margin: 0;
    padding: 0;
    font-weight: 400;
    > * {
      font-family: 'Pretendard-Regular','Roboto', 'Noto Sans KR', sans-serif;
    }
  }
  p,ul,li,h1,h2 {
    padding: 0;
    margin: 0;
    list-style: none;
  } 
  button {
    padding: 0;
    border : none;
  }
  // react-datepicker 다른 요소에 가려지는것 방지
  .react-datepicker-popper {
    z-index: 3 !important; // 혹시 다른 스타일에 의해 오버라이드 되는 것을 방지하기 위해 !important를 사용하였습니다.
  }
`;
export default GlobalStyle;
