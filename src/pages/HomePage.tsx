import { fetchLogout } from "../api/signUp";

function HomePage() {
  const handleLogoutBtnClick = () => {
    fetchLogout();
    alert("로그아웃이 완료되었습니다!");
  };
  return (
    <div>
      홈입니다🏡
      <button type="button" onClick={handleLogoutBtnClick}>
        {" "}
        로그아웃
      </button>
    </div>
  );
}

export default HomePage;
