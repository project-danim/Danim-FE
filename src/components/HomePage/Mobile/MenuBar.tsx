import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import {
  fetchLogout,
  getAccessToken,
  getRefreshToken,
} from "../../../api/signUp";
import st from "./MenuBarST";
import loginUserIdState from "../../../recoil/login/userInfo";

function MenuBar() {
  // navigate 함수 생성
  const navigate = useNavigate();

  // 토큰 state
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const [userAccessCookie, setUserAccessCookie] = useState(accessToken);
  const [userRefreshCookie, setUserRefreshCookie] = useState(refreshToken);
  const [, setLoginUserId] = useRecoilState(loginUserIdState);

  // 사용자 닉네임
  const userNickname = localStorage.getItem("nickname");

  // 유저 프로필 사진
  const profileImg = localStorage.getItem("profileUrl");
  const [userProfile, setUserProfile] = useState("");

  // 서버로부터 새로운 프로필 이미지 받아오면 업데이트
  useEffect(() => {
    if (profileImg !== "" && profileImg !== null) {
      setUserProfile(() => profileImg);
    }
  }, [profileImg, userProfile]);

  // 로그아웃 뮤테이션 함수
  const { mutate: mutateLogout } = useMutation(fetchLogout, {
    onSuccess: () => {
      alert("로그아웃이 완료되었습니다.");
      setUserAccessCookie(null);
      setUserRefreshCookie(null);
      setLoginUserId("");
      return navigate("/");
    },
    onError: () => {
      alert("요청 실패 : 로그아웃을 다시 시도해 주세요.");
    },
  });

  // 홈 버튼 클릭시
  const handleHomeButtonClick = () => {
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

  // 로그아웃 버튼 클릭시
  const handleLogoutButtonClick = () => {
    mutateLogout();
  };

  // 채팅하기 버튼 클릭시
  const handleChatButtonClick = () => {
    navigate("/chat-list");
  };

  // 마이페이지 버튼 클릭시
  const handleMyPageButtonClick = () => {
    navigate("/mypage");
  };

  // 닫기 버튼 클릭시
  const handleCloseButtonClick = () => {
    window.history.back();
  };
  // 동행 만들기 버튼 클릭시
  const handleCreatePostClick = () => {
    navigate("/create-post/step1");
  };

  return (
    <st.MenuBarContainer>
      {userAccessCookie || userRefreshCookie ? (
        // 로그인 된 상태
        <>
          <st.UserProfile
            src={
              userProfile ||
              "https://danimdata.s3.ap-northeast-2.amazonaws.com/avatar.png"
            }
            alt="마이 페이지"
          />
          <st.UserNickname>{userNickname}</st.UserNickname>
          <st.CloseButton type="button" onClick={handleCloseButtonClick}>
            닫기
          </st.CloseButton>

          <st.SignUpLoginContainer
            buttonName="logout"
            onClick={handleLogoutButtonClick}
          >
            <button type="button">로그아웃</button>
          </st.SignUpLoginContainer>
          <st.HomeAndMyAndChatContainer>
            <button type="button" onClick={handleHomeButtonClick}>
              홈
            </button>
            <button type="button" onClick={handleMyPageButtonClick}>
              My Page
            </button>
            <button type="button" onClick={handleChatButtonClick}>
              채팅 목록
            </button>
          </st.HomeAndMyAndChatContainer>
          <st.PostButton type="button" onClick={handleCreatePostClick}>
            동행 만들기
          </st.PostButton>
        </>
      ) : (
        // 로그인 되지 않은 상태
        <>
          <st.ServiceInfoText>
            <p>사람들과의 가장 즐거웠던 동행의 유형은 무엇이였나요?</p>
            <p>여러 가지 키워드 별로 마음 맞는 친구를 만들어 보세요!</p>
            <st.CloseButton type="button" onClick={handleCloseButtonClick}>
              닫기
            </st.CloseButton>
          </st.ServiceInfoText>
          <st.SignUpLoginContainer buttonName="signUpLogin">
            <button type="button" onClick={handleClickSignUpButton}>
              회원가입
            </button>
            <button type="button" onClick={handleClickLoginButton}>
              로그인
            </button>
          </st.SignUpLoginContainer>
          <st.HomeAndMyAndChatContainer>
            <button type="button" onClick={handleHomeButtonClick}>
              홈
            </button>
            <button type="button" onClick={handleMyPageButtonClick}>
              My Page
            </button>
            <button type="button" onClick={handleChatButtonClick}>
              채팅 목록
            </button>
          </st.HomeAndMyAndChatContainer>
          <st.PostButton type="button" onClick={handleCreatePostClick}>
            동행 만들기
          </st.PostButton>
        </>
      )}
    </st.MenuBarContainer>
  );
}

export default MenuBar;
