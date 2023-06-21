import st from "./notFoundST";

function NotFound() {
  return (
    <div>
      <st.InformationTextContainer>
        <div>
          <st.titleText>페이지를 찾을 수 없습니다.</st.titleText>
          <st.InformationText>
            다른 페이지를 찾아서 <span>다녀</span>볼까요?
          </st.InformationText>
        </div>
        <st.ErrorCodeText>404</st.ErrorCodeText>
      </st.InformationTextContainer>
      <st.ExitText>로고를 클릭하여 이 페이지에서 벗어나세요.</st.ExitText>
      <st.notFouncImg
        src="/notFound/notFoundGirl.svg"
        alt="존재하지 않는 페이지 요청으로 어지러워요"
      />
    </div>
  );
}

export default NotFound;
