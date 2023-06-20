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
  p,ul,li {
    padding: 0;
    margin: 0;
  } 
`;
export default GlobalStyle;
