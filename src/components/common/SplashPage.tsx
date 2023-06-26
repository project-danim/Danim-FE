import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import st from "./commonStyle/SplashST";

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 1500);

    // 컴포넌트 unmount 시에 timer를 clear하는 cleanup function을 반환
    return () => clearTimeout(timer);
  }, [navigate]); // navigate가 변경될 때마다 이 effect를 다시 실행

  return (
    <st.background>
      <h1>
        <st.danimTextLogo src="mobile/main/danimText.svg" alt="다님" />
      </h1>
      <st.danimLogo src="mobile/main/danimLogo.svg" alt="다님 로고" />
      <st.mainText
        src="mobile/main/mainText.svg"
        alt="어느 곳에서나 누군가와 함께"
      />
    </st.background>
  );
}

export default SplashPage;
