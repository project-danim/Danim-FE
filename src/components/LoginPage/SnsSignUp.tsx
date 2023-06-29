import st from "../SignUpPage/SignUpST";
import loginSt from "./LoginST";
import KAKAO_AUTH_URL from "./kakaoAuth";

function SnsSignUp({ pageName }: { pageName: string }) {
  // 카카오 로그인 함수
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  // 구글 로그인 함수
  const handleGoogleLogin = () => alert("아직 준비중인 서비스입니다!");

  // 네이버 로그인 함수
  const handleNaverLogin = () => {
    alert("아직 준비중인 서비스입니다!");
  };
  return (
    <>
      {pageName === "loginPage" ? (
        <st.FormExplainText pageName={pageName}>
          SNS로 로그인
        </st.FormExplainText>
      ) : null}
      <loginSt.SocialLoginContainer>
        <loginSt.SocialButton
          url="naver"
          type="button"
          onClick={handleNaverLogin}
        >
          네이버 계정으로 {pageName === "loginPage" ? "로그인" : "회원가입"}
        </loginSt.SocialButton>
        <loginSt.SocialButton
          url="kakao"
          type="button"
          onClick={handleKakaoLogin}
        >
          카카오 계정으로 {pageName === "loginPage" ? "로그인" : "회원가입"}
        </loginSt.SocialButton>
        <loginSt.SocialButton
          url="google"
          type="button"
          onClick={handleGoogleLogin}
        >
          구글 계정으로 {pageName === "loginPage" ? "로그인" : "회원가입"}
        </loginSt.SocialButton>
        <loginSt.SocialExplainText>
          소셜 로그인으로 가입 시 이용약관, 개인정보처리방침, 전자금융거래약관에
          동의함으로 처리됩니다.
        </loginSt.SocialExplainText>
      </loginSt.SocialLoginContainer>
    </>
  );
}

export default SnsSignUp;
