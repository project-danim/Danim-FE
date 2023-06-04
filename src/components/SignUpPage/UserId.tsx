import React, { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import st from "./SignUpST";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { fetchCheckId } from "../../api/signUp";

interface MyComponentProps {
  pageName: string;
  onIdChange: any;
  idRef: any;
  loginIdError?: string;
  signUpIdError?: string;
  setIsIdUnique?: any;
}

function UserId({
  pageName,
  onIdChange,
  idRef,
  loginIdError,
  signUpIdError,
  setIsIdUnique,
}: MyComponentProps) {
  // 아이디 입력값 state
  const [userId, handleChangeUserId, setUserId] = useInput("");

  // 아이디 에러 메세지 state
  const [userIdError, setUserIdError] = useState("");

  // 로그인 아이디 값 입력 핸들러
  const handleChangeLoginId = (e: ChangeEvent<HTMLInputElement>) => {
    const newUserId = e.target.value;
    setUserId(newUserId);
    onIdChange(newUserId);
  };

  // 회원가입 아이디 값 입력 핸들러
  const handleChangeSignUpId = (e: ChangeEvent<HTMLInputElement>) => {
    const newUserId = e.target.value;
    setUserId(newUserId);
    onIdChange(newUserId);
  };

  // 아이디 중복 검사 뮤테이션 함수
  const { mutate: mutateCheckId } = useMutation(fetchCheckId, {
    onSuccess: (response) => {
      if (response === "아이디 중복 검사 성공") {
        setIsIdUnique(true);
        setUserIdError("사용 가능한 아이디입니다.");
        return;
      }
      if (response === "중복된 아이디 입니다.") {
        setIsIdUnique(false);
        setUserIdError("중복된 아이디입니다.");
      }
    },
    onError: (error) => {
      console.log("실패", error);
    },
  });

  // 아이디 중복 검사
  const handleCheckIdBtnClick = () => {
    // 아이디 값이 없는 상태로 중복검사 요청시
    if (!userId) {
      idRef.current?.focus();
      setUserIdError("아이디를 입력하세요.");
      return;
    }
    mutateCheckId(userId);
  };

  return (
    <div>
      {pageName === "loginPage" ? (
        <>
          <label htmlFor="userId">
            <st.IdAreaExplainText>아이디</st.IdAreaExplainText>
            <st.CommonInput
              ref={idRef}
              type="text"
              value={userId}
              onChange={handleChangeLoginId}
              placeholder="이메일 주소를 입력해주세요."
              aria-describedby="idInputError"
            />
          </label>
          <st.CommonErrorText role="alert" id="idInputError">
            {loginIdError}
          </st.CommonErrorText>
        </>
      ) : (
        <>
          <label htmlFor="userId">
            <st.IdAreaExplainText>*아이디 설정</st.IdAreaExplainText>
            <st.IdAreaContainer>
              <st.CommonInput
                id="userId"
                type="text"
                value={userId}
                onChange={handleChangeSignUpId}
                ref={idRef}
                placeholder="이메일 주소를 입력해 주세요."
                aria-describedby="userIdError"
              />
              <st.OriginalButton type="submit" onClick={handleCheckIdBtnClick}>
                중복 확인
              </st.OriginalButton>
            </st.IdAreaContainer>
          </label>
          <st.CommonErrorText role="alert" id="userIdError">
            {userIdError || signUpIdError}
          </st.CommonErrorText>
        </>
      )}
    </div>
  );
}
UserId.defaultProps = {
  loginIdError: "",
  signUpIdError: "",
  setIsIdUnique: null,
};
export default UserId;
