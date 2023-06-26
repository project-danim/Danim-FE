import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  body {
    font-family: 'Pretendard', 'Roboto', 'Noto Sans KR', sans-serif;
    font-weight: 400;
  }
  h1,h2,h3,h4 {
    margin: 0;
  }


  // react-datepicker 다른 요소에 가려지는것 방지
  .react-datepicker-popper {
    z-index: 3 !important; // 혹시 다른 스타일에 의해 오버라이드 되는 것을 방지하기 위해 !important를 사용하였습니다.
  }
  :root {
  --button-1-default-color: #a3bf3b;
  --button-1-hover-outline-color: #e4edc5;
  --button-1-pressed-color: #2e5902;
  --button-2-default-color: #2e5902;
  --button-2-hover-outline-color: #e4edc5;
  --button-2-pressed-color: #224101;
  --button-3-default-color: #2e5902;
  --button-3-default-outline-color: #e4edc5;
  --button-3-font-color: #5c5c5c;
  --button-4-default-color: #b5bf69;
  --button-4-hover-color: #a0ac49;
  --button-4-pressed-outline-color: #bfb578;
  --button-5-default-color: #a3bf3b;
  --button-5-hover-color: #82982f;
  --button-5-pressed-color: #A3BF3B;
  --button-6-default-color: #F5F5F5;
  --button-6-hover-color: #E4EDC5;
  --button-6-pressed-color: #A3BF3B;
}
`;
export default GlobalStyle;
