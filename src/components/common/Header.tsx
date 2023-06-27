import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { fetchLogout, getAccessToken, getRefreshToken } from "../../api/signUp";
import loginUserIdState from "../../recoil/login/userInfo";
import st from "./commonStyle/HeaderST";
import {
  filterList,
  filteredAge,
  filteredGroupSize,
  filteredLocation,
  isSearchClicked,
  searchedTitleState,
} from "../../recoil/filter/filterdPost";
import hasNewChatState from "../../recoil/chat/alarm";

function Header() {
  // 채팅 알람 state
  const [hasNewChat] = useRecoilState(hasNewChatState);
  // 채팅이 새로 왔는지에 대한 state
  const [hasNew, setHasNew] = useState(false);

  // 토큰 state
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const [userAccessCookie, setUserAccessCookie] = useState(accessToken);
  const [userRefreshCookie, setUserRefreshCookie] = useState(refreshToken);
  const [, setLoginUserId] = useRecoilState(loginUserIdState);

  // 메인페이지에서 관리하는 검색 state
  const setSearchedTitle = useSetRecoilState(searchedTitleState);
  const setFilterList = useSetRecoilState(filterList);
  const setFilteredLocation = useSetRecoilState(filteredLocation);
  const setFilteredGroupSize = useSetRecoilState(filteredGroupSize);
  const setFilteredAge = useSetRecoilState(filteredAge);
  const [isSearched, setIsSearched] = useRecoilState(isSearchClicked);

  // 유저 프로필 사진
  const profileImg = localStorage.getItem("profileUrl");
  const [userProfile, setUserProfile] = useState("");

  // 네비게이트 함수 생성
  const navigate = useNavigate();

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

  // 다님 로고 클릭시
  const handleClickDanimLogo = () => {
    // 검색 state가 남아있을때만 실행되는 조건
    if (isSearched) {
      setSearchedTitle("");
      setFilterList([]);
      setFilteredLocation("");
      setFilteredGroupSize("");
      setFilteredAge([]);
      setIsSearched(() => false);
    }
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
    navigate("/chat-list");
  };

  // 마이페이지 버튼 클릭시
  const handleMyPageButtonClick = () => {
    navigate("/mypage");
  };

  // 로그아웃 버튼 클릭시
  const handleLogoutButtonClick = () => {
    mutateLogout();
  };

  // 동행 만들기 버튼 클릭시
  const handleCreatePostClick = () => {
    navigate("/create-post/step1");
  };

  useEffect(() => {
    if (profileImg !== "" && profileImg !== null) {
      setUserProfile(() => profileImg);
    }
  }, [profileImg, userProfile]);

  useEffect(() => {
    setHasNew(() => hasNewChat);
  }, [hasNewChat]);
  return (
    <st.headerAria>
      <st.DanimTitle>다님</st.DanimTitle>
      <st.Container>
        <st.DanimLogo
          onClick={handleClickDanimLogo}
          src="/header/danimLogo.svg"
          alt="다님 로고"
        />
        {userAccessCookie || userRefreshCookie ? (
          <st.ButtonContainer>
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
              hasNew={hasNew}
            >
              <img src="/header/chat.svg" alt="채팅하기" />
            </st.chatAndUserButton>
            <st.chatAndUserButton
              buttonName="user"
              type="button"
              onClick={handleMyPageButtonClick}
            >
              <st.userProfile
                src={
                  userProfile ||
                  "https://danimdata.s3.ap-northeast-2.amazonaws.com/avatar.png"
                }
                alt="마이 페이지"
              />
            </st.chatAndUserButton>
            <st.CommonStyleButton
              buttonName="logout"
              type="button"
              onClick={handleLogoutButtonClick}
            >
              로그아웃
            </st.CommonStyleButton>
          </st.ButtonContainer>
        ) : (
          <st.ButtonContainer>
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
          </st.ButtonContainer>
        )}
      </st.Container>
    </st.headerAria>
  );
}

export default Header;
