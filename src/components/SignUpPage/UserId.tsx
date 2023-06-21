import { useRecoilState } from "recoil";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import st from "./SignUpST";
import loginSt from "../LoginPage/LoginST";
import { fetchCheckId } from "../../api/signUp";
import {
  isUserIdUniqueState,
  signUpUserIdState,
} from "../../recoil/signUp/userInfo";
import loginUserIdState from "../../recoil/login/userInfo";

interface MyComponentProps {
  pageName: string;
  idRef: any;
  loginIdError?: string;
  signUpIdError?: string;
}

function UserId({
  pageName,
  idRef,
  loginIdError,
  signUpIdError,
}: MyComponentProps) {
  // 아이디 입력값, 아이디 중복 여부 state
  const [signUpUserId, setSignUpUserId] = useRecoilState(signUpUserIdState);
  const [loginUserId, setLoginUserId] = useRecoilState(loginUserIdState);
  const [isIdUnique, setIsIdUnique] = useRecoilState(isUserIdUniqueState);
  // 아이디 에러 메세지 state
  const [userIdError, setUserIdError] = useState("");

  // 로그인 아이디 값 입력 핸들러
  const handleChangeLoginId = (e: ChangeEvent<HTMLInputElement>) => {
    const newUserId = e.target.value;
    setLoginUserId(newUserId);
  };

  // 회원가입 아이디 값 입력 핸들러
  const handleChangeSignUpId = (e: ChangeEvent<HTMLInputElement>) => {
    const newUserId = e.target.value;
    setSignUpUserId(newUserId);
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
      throw error;
    },
  });

  // 아이디 중복 검사
  const handleCheckIdBtnClick = () => {
    // 유효하지 않은 입력값으로 중복검사 요청시
    if (userIdError === "올바르지 않은 아이디 형식입니다.") {
      return idRef.current?.focus();
    }

    // 아이디 값이 없는 상태로 중복검사 요청시
    if (!signUpUserId) {
      idRef.current?.focus();
      return setUserIdError("아이디를 입력하세요.");
    }
    return mutateCheckId(signUpUserId);
  };

  useEffect(() => {
    const idPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!!signUpUserId && !idPattern.test(signUpUserId)) {
      setUserIdError(() => "올바르지 않은 아이디 형식입니다.");
      setIsIdUnique(false); // 입력값이 변경될 때마다 중복검사를 초기화
      return;
    }

    if (signUpUserId) {
      setUserIdError("아이디 중복을 확인하세요.");
      setIsIdUnique(false); // 입력값이 변경될 때마다 중복검사를 초기화
      return;
    }
    if (!!signUpUserId && !!isIdUnique) {
      setUserIdError(() => "사용 가능한 아이디입니다.");
    }
  }, [signUpUserId]);

  // 컴포넌트 렌더링 시 아이디 입력값 초기화
  useEffect(() => {
    setSignUpUserId(() => "");
    setUserIdError("");
  }, []);
  return (
    <div>
      {pageName === "loginPage" ? (
        <>
          <label htmlFor="userId">
            <st.IdAreaExplainText>아이디</st.IdAreaExplainText>
            <loginSt.CommonInput
              ref={idRef}
              type="text"
              value={loginUserId}
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
                value={signUpUserId}
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
};
export default UserId;
