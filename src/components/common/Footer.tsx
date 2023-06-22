import styled from "styled-components";
import st from "./commonStyle/FooterST";

const Container = styled.footer`
  width: 100%;
  height: 205px;
  padding: 40px 0 54px;
  box-sizing: border-box;
  background-color: #f3f6fa;
`;

function Footer() {
  const messages = ["회사소개", "이용약관", "개인정보 처리방침", "공지사항"];

  return (
    <Container>
      <st.footerContainer>
        <st.logoAndCopyrightContainer>
          <st.danimLogo src="/footer/footerLogo.svg" alt="다님 로고" />
          <div>
            <p>Contact | team.danim.official@gmail.com</p>
            <p>Copyright | 2023 (주)다님, Inc. All rights reserved.</p>
          </div>
        </st.logoAndCopyrightContainer>
        {/* 공지사항 부분에 공지사항 연결해 놓으면 좋을거 같은데 나중에 할게요,, */}
        <st.allInfoContainer>
          {messages.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </st.allInfoContainer>
      </st.footerContainer>
    </Container>
  );
}

export default Footer;
