import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import { fetchLogout, getAccessToken, getRefreshToken } from "../../api/signUp";
import loginUserIdState from "../../recoil/login/userInfo";
import st from "./HeaderST";

function Header() {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const [userAccessCookie, setUserAccessCookie] = useState(accessToken);
  const [userRefreshCookie, setUserRefreshCookie] = useState(refreshToken);
  const [, setLoginUserId] = useRecoilState(loginUserIdState);

  // 네비게이트 함수 생성
  const navigate = useNavigate();

  // 로그아웃 뮤테이션 함수
  const { mutate: mutateLogout } = useMutation(fetchLogout, {
    onSuccess: () => {
      alert("로그아웃이 완료되었습니다.");
      setLoginUserId("");
      return navigate("/");
    },
    onError: (error: any) => {
      console.log(error);
      alert("요청 실패 : 로그아웃을 다시 시도해 주세요.");
    },
  });

  // 다님 로고 클릭시
  const handleClickDanimLogo = () => {
    navigate("/");
  };

  // 회원가입 버튼 클릭시
  const handleClickSignUpButton = () => {
    navigate("/signUp");
  };

  // 로그인 버튼 클릭시
  const handleClickLoginButton = () => {
    navigate("/login");
  };

  // 채팅하기 버튼 클릭시
  const handleChatButtonClick = () => {
    navigate("/chat");
  };

  // 마이페이지 버튼 클릭시
  const handleMyPageButtonClick = () => {
    navigate("/mypage");
  };

  // 로그아웃 버튼 클릭시
  const handleLogoutButtonClick = () => {
    mutateLogout();
    setUserAccessCookie(null);
    setUserRefreshCookie(null);
    navigate("/");
  };

  const handleCreatePostClick = () => {
    navigate("/create-post/step1");
  };

  return (
    <st.headerAria>
      <st.Container>
        <st.DanimLogo onClick={handleClickDanimLogo}>danim</st.DanimLogo>
        <st.ButtonContainer>
          {userAccessCookie || userRefreshCookie ? (
            <>
              <st.CommonStyleButton
                buttonName="post"
                type="button"
                onClick={handleCreatePostClick}
              >
                동행 만들기
              </st.CommonStyleButton>
              <st.chatAndUserButton
                buttonName="chat"
                type="button"
                onClick={handleChatButtonClick}
              >
                채팅하기
              </st.chatAndUserButton>
              <st.chatAndUserButton
                buttonName="user"
                type="button"
                onClick={handleMyPageButtonClick}
              >
                마이 페이지
              </st.chatAndUserButton>
              <st.CommonStyleButton
                buttonName="logout"
                type="button"
                onClick={handleLogoutButtonClick}
              >
                로그아웃
              </st.CommonStyleButton>
            </>
          ) : (
            <>
              <st.CommonStyleButton
                type="button"
                buttonName="signUp"
                onClick={handleClickSignUpButton}
              >
                회원가입
              </st.CommonStyleButton>
              <st.CommonStyleButton
                type="button"
                buttonName="login"
                onClick={handleClickLoginButton}
              >
                로그인
              </st.CommonStyleButton>
            </>
          )}
        </st.ButtonContainer>
      </st.Container>
    </st.headerAria>
  );
}

export default Header;
