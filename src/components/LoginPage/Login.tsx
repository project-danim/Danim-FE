import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import KAKAO_AUTH_URL from "./kakaoAuth";
import useInput from "../../hooks/useInput";
import { fetchLogin } from "../../api/signUp";
import st from "../SignUpPage/SignUpST";
import loginSt from "./LoginST";
import UserId from "../SignUpPage/UserId";

function Login() {
  // 아이디 입력값 state , 아이디 에러 메세지 state
  const [userId, , setUserId, userIdRef] = useInput("");
  const [userIdError, setUserIdError] = useState("");
  // 비밀번호 입력값 state, 비밀번호 에러 메세지 state
  const [password, handleChangePassword, , passwordRef] = useInput("");
  const [passwordError, setPasswordError] = useState("");
  // 네비게이트 함수 생성
  const navigate = useNavigate();

  // 아이디 입력 핸들러
  const handleIdChange = (newId: string) => {
    setUserId(newId);
  };

  // 아이디 유효성 검사
  useEffect(() => {
    const idPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!!userId && !idPattern.test(userId)) {
      setUserIdError("올바르지 않은 아이디 형식입니다.");
      return;
    }
    if (userId || !userId) {
      setUserIdError("");
    }
  }, [userId]);

  // 로그인 뮤테이션 함수
  const { mutate: mutateLogin } = useMutation(fetchLogin, {
    onSuccess: (response) => {
      if (response.data.message === "로그인 성공") {
        return navigate("/");
      }
      return alert(response.data.message);
    },
    onError: (error) => {
      console.log(error);
      alert("요청이 실패했습니다. 다시 시도해주세요!");
    },
  });

  // 비밀번호 유효성 검사
  useEffect(() => {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_!?@#$%^&*]{5,12}$/;
    if (!!password && !passwordPattern.test(password)) {
      setPasswordError("5~12자 이내의 영문,숫자 조합을 입력하세요.");
      return;
    }
    if (password) {
      setPasswordError("");
    }
  }, [password]);

  // 로그인 버튼 클릭 핸들러
  const handleLoginBtnClick = () => {
    // 아이디 값이 없거나 에러 메세지가 있을 경우
    if (!userId) {
      userIdRef.current?.focus();
      setUserIdError("아이디를 입력하세요.");
      return;
    }
    if (userIdError) {
      userIdRef.current?.focus();
      return;
    }

    // 비밀번호 값이 없거나 에러 메세지가 있을 경우
    if (!password) {
      passwordRef.current?.focus();
      setPasswordError("비밀번호를 입력하세요.");
      return;
    }
    if (passwordError) {
      passwordRef.current?.focus();
    }
    const user = {
      userId,
      password,
    };
    mutateLogin(user);
  };

  // 카카오 로그인 함수
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <st.ContainerForm>
      <UserId
        pageName="loginPage"
        onIdChange={handleIdChange}
        idRef={userIdRef}
        loginIdError={userIdError}
      />
      <label htmlFor="userPassword">
        <st.IdAreaExplainText>비밀번호</st.IdAreaExplainText>
        <loginSt.CommonInput
          ref={passwordRef}
          type="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="비밀번호를 입력해주세요."
          aria-describedby="pwInputError"
        />
        <st.CommonErrorText role="alert" id="pwInputError">
          {passwordError}
        </st.CommonErrorText>
      </label>
      <div>
        <loginSt.LoginButton type="button" onClick={handleLoginBtnClick}>
          로그인
        </loginSt.LoginButton>
        <loginSt.FindUserInfoContainer>
          아이디 찾기｜비밀번호 찾기｜비밀번호 변경
        </loginSt.FindUserInfoContainer>
      </div>

      <st.FormExplainText pageName="loginPage">SNS로 로그인</st.FormExplainText>
      <loginSt.SocialLoginContainer>
        <loginSt.SocialButton url="naver" type="button" onClick={kakaoLogin}>
          네이버 계정으로 회원가입
        </loginSt.SocialButton>
        <loginSt.SocialButton url="kakao" type="button" onClick={kakaoLogin}>
          카카오 계정으로 회원가입
        </loginSt.SocialButton>
        <loginSt.SocialButton url="google" type="button" onClick={kakaoLogin}>
          구글 계정으로 회원가입
        </loginSt.SocialButton>
        <loginSt.SocialExplainText>
          소셜 로그인으로 가입 시 이용약관, 개인정보처리방침, 전자금융거래약관에
          동의함으로 처리됩니다.
        </loginSt.SocialExplainText>
      </loginSt.SocialLoginContainer>
    </st.ContainerForm>
  );
}

export default Login;
