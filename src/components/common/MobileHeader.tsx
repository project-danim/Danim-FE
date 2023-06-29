import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import hasNewChatState from "../../recoil/chat/alarm";
import { getAccessToken, getRefreshToken } from "../../api/signUp";
import {
  filterList,
  filteredAge,
  filteredGroupSize,
  filteredLocation,
  isSearchClicked,
  searchedTitleState,
} from "../../recoil/filter/filterdPost";
import st from "./commonStyle/HeaderST";

function MobileHeader() {
  // 로컬에 저장된 새로운 채팅 여부 (boolean)
  const hasNew = localStorage.getItem("hasNewChat");
  // 채팅 알람에 대한 state
  const [hasNewChat] = useRecoilState(hasNewChatState);

  // 토큰 state
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const [userAccessCookie] = useState(accessToken);
  const [userRefreshCookie] = useState(refreshToken);

  // 메인페이지에서 관리하는 검색 state
  const setSearchedTitle = useSetRecoilState(searchedTitleState);
  const setFilterList = useSetRecoilState(filterList);
  const setFilteredLocation = useSetRecoilState(filteredLocation);
  const setFilteredGroupSize = useSetRecoilState(filteredGroupSize);
  const setFilteredAge = useSetRecoilState(filteredAge);
  const [isSearched, setIsSearched] = useRecoilState(isSearchClicked);

  // 네비게이트 함수 생성
  const navigate = useNavigate();

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

  // 메뉴 버튼 클릭시
  const handleMenuButtonClick = () => {
    navigate("/menu-bar");
  };

  // 채팅하기 버튼 클릭시
  const handleChatButtonClick = () => {
    navigate("/chat-list");
  };

  // 새로운 채팅 알람 업데이트
  useEffect(() => {
    const stringHasNewChat = String(hasNewChat);
    localStorage.setItem("hasNewChat", stringHasNewChat);
  }, [hasNewChat]);

  return (
    <st.headerAria>
      <st.DanimTitle>다님</st.DanimTitle>
      <st.Container>
        {userAccessCookie || userRefreshCookie ? (
          // 로그인 된 상태일 경우
          <st.ButtonContainer>
            <button type="button" onClick={handleMenuButtonClick}>
              <img src="/mobile/header/menu.svg" alt="메뉴" />
            </button>
            <st.DanimLogo
              onClick={handleClickDanimLogo}
              src="/mobile/header/danimLogo.svg"
              alt="다님 로고"
            />
            <st.chatAndUserButton
              type="button"
              buttonName="chat"
              onClick={handleChatButtonClick}
              hasNew={hasNew === "true"}
            >
              <img src="/mobile/header/chat.svg" alt="채팅하기" />
            </st.chatAndUserButton>
          </st.ButtonContainer>
        ) : (
          <st.MobileButtonContainer>
            <button type="button" onClick={handleMenuButtonClick}>
              <img src="/mobile/header/menu.svg" alt="메뉴" />
            </button>
            <st.DanimLogo
              onClick={handleClickDanimLogo}
              src="/mobile/header/danimLogo.svg"
              alt="다님 로고"
            />
            <button type="button" onClick={handleChatButtonClick}>
              <img src="/mobile/header/chat.svg" alt="채팅하기" />
            </button>
          </st.MobileButtonContainer>
        )}
      </st.Container>
    </st.headerAria>
  );
}

export default MobileHeader;
