import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import useInput from "../../hooks/useInput";
import st from "./SignUpST";
import { fetchSignUp } from "../../api/signUp";
import { ApiResponse, ErrorResponse } from "../../types/apiType";
import { User } from "../../types/userType";
import useToggle from "../../hooks/useToggle";
import UserId from "./UserId";
import {
  isNicknameUniqueState,
  isUserIdUniqueState,
  nicknameState,
  signUpUserIdState,
} from "../../recoil/signUp/userInfo";
import Nickname from "./Nickname";
import SnsSignUp from "../LoginPage/SnsSignUp";
import { ageList } from "../HomePage/FilterListData";

function SignUp() {
  // 네비게이트 생성
  const navigate = useNavigate();
  // 아이디, 비밀번호, 닉네임, 성별, 나이 입력값 state
  const [userId] = useRecoilState(signUpUserIdState);
  const userIdRef = useRef<any>();
  const [isIdUnique] = useRecoilState(isUserIdUniqueState);
  const [password, handleChangePassword, , passwordRef] = useInput("");
  const [passwordCheck, handleChangePasswordCheck, , passwordCheckRef] =
    useInput("");
  const [nickname] = useRecoilState(nicknameState);
  const nicknameRef = useRef<any>();
  const [isNicknameUnique] = useRecoilState(isNicknameUniqueState);
  const [activeGender, setActiveGender] = useState("");
  const userGenderRef = useRef<HTMLButtonElement>(null);
  const [agreeGender, handleAgreeGender] = useToggle(false);
  const [activeAge, setActiveAge] = useState("");
  const [agreeForAge, handleIsAgreeForAge] = useToggle(false);

  // 아이디, 비밀번호, 닉네임, 성별, 연령대 에러 메세지 state
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [nicknameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [ageError, setAgeError] = useState("");

  // 성별과 연령대 정보 배열
  const genders = ["남", "여"];

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

  // 비밀번호 일치 검사
  useEffect(() => {
    if (!password) {
      setPasswordError("");
    }
    if (!passwordCheck) {
      setPasswordCheckError("");
    }
    if (!!passwordCheck && passwordCheck !== password) {
      setPasswordCheckError("비밀번호가 일치하지 않습니다.");
    }
    if (!!password && passwordCheck === password) {
      setPasswordCheckError("비밀번호가 일치합니다.");
    }
  }, [password, passwordCheck]);

  // 성별 선택값 유효성 검사
  useEffect(() => {
    if (activeGender) {
      setGenderError("");
      return;
    }
    if (agreeGender) {
      setGenderError("");
    }
  }, [activeGender, agreeGender]);

  // 성별 클릭 핸들러, 성별 정보 제공 핸들러
  const handleGenderClick = (gender: string) => {
    setActiveGender(() => gender);
  };
  const handleAgreeForGender = () => {
    handleAgreeGender();
  };

  // 연령 유효성 검사
  useEffect(() => {
    if (activeAge) {
      setAgeError("");
      return;
    }
    if (agreeForAge) {
      setGenderError("");
    }
  }, [activeAge, agreeForAge]);

  // 연령 클릭 핸들러, 연령 정보 제공 핸들러
  const handleAgeClick = (age: string) => {
    setActiveAge(age);
  };
  const handleAgreeForAge = () => {
    handleIsAgreeForAge();
  };

  // 회원가입 api 응답 성공시 핸들링 함수
  function handleApiResponse<T>(response: ApiResponse<T>) {
    if (response.status === 200) {
      // alert("회원가입이 완료되었습니다!");
    }
  }

  // 회원가입 api 응답 실패시 핸들링 함수
  const handleApiError = (error: ErrorResponse) => {
    const message = error?.data;
    throw message;
  };

  // 회원가입 뮤테이션 함수
  const { mutate: mutateSignUp } = useMutation(fetchSignUp, {
    onSuccess: handleApiResponse,
    onError: handleApiError,
  });

  // 회원가입 버튼 클릭시
  const handleSignUpBtnClick = () => {
    // 아이디 값이 없거나 중복검사를 완료하지 않았거나 중복된 아이디일 경우
    if (!userId) {
      userIdRef.current?.focus();
      setUserIdError("아이디를 입력하세요.");
      return;
    }
    if (!isIdUnique) {
      userIdRef.current?.focus();
      return;
    }

    // 닉네임 값이 없거나 중복검사를 완료하지 않았거나 중복된 닉네임일 경우
    if (!nickname || !isNicknameUnique) {
      nicknameRef.current?.focus();
      return;
    }

    // 비밀번호 값이 없거나 유효하지 않은 값이거나, 비밀번호가 일치하지 않을 경우
    if (!password) {
      passwordRef.current?.focus();
      return;
    }
    if (passwordError === "5~12자 이내의 영문,숫자 조합을 입력하세요.") {
      passwordRef.current?.focus();
      return;
    }
    if (passwordCheckError !== "비밀번호가 일치합니다.") {
      passwordCheckRef.current?.focus();
      return;
    }

    // 성별 값이 없거나 정보 제공에 동의하지 않은 경우
    if (!activeGender) {
      userGenderRef.current?.focus();
      setGenderError("성별을 선택해주세요.");
      return;
    }
    if (!agreeGender) {
      setGenderError("성별 정보 제공에 동의해주세요.");
      return;
    }

    // 연령 값이 없거나 정보 제공에 동의하지 않은 경우
    if (!activeAge) {
      setAgeError("연령을 선택해주세요.");
      return;
    }
    if (!agreeForAge) {
      setAgeError("연령 정보 제공에 동의해주세요.");
      return;
    }

    const user: User = {
      userId,
      password,
      gender: activeGender,
      ageRange: activeAge,
      nickname,
      agreeForGender: true,
      agreeForAge: true,
    };
    mutateSignUp(user);
    Swal.fire({
      icon: "success",
      title: "👏",
      text: "회원가입이 완료되었습니다!",
      confirmButtonColor: "#A3BF3B",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  return (
    <st.ContainerForm
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
    >
      <SnsSignUp pageName="signUpPage" />
      <st.FormExplainText pageName="signUpPage">
        회원가입에 필요한 정보를 입력해주세요.
      </st.FormExplainText>
      <st.SignUpExplainText>*는 필수 기입 사항입니다.</st.SignUpExplainText>
      <st.UserInfoContainer>
        <UserId
          pageName="signUpPage"
          idRef={userIdRef}
          signUpIdError={userIdError}
        />
        <Nickname
          nicknameRef={nicknameRef}
          signUpNicknameError={nicknameError}
        />
        <div>
          <label htmlFor="userPassword">
            <st.IdAreaExplainText>*비밀번호 설정</st.IdAreaExplainText>
            <st.CommonInput
              type="password"
              value={password}
              onChange={handleChangePassword}
              ref={passwordRef}
              id="userPassword"
              placeholder="비밀번호를 입력해 주세요."
              aria-describedby="userPasswordError"
              maxLength={12}
            />
          </label>
          <st.CommonErrorText role="alert" id="userPasswordError">
            {passwordError}
          </st.CommonErrorText>
        </div>
        <div>
          <label htmlFor="userPasswordCheck">
            <st.IdAreaExplainText>*비밀번호 확인</st.IdAreaExplainText>
            <st.CommonInput
              type="password"
              value={passwordCheck}
              onChange={handleChangePasswordCheck}
              ref={passwordCheckRef}
              id="userPasswordCheck"
              placeholder="비밀번호를 확인해 주세요."
              aria-describedby="passwordCheckError"
              maxLength={12}
            />
          </label>
          <st.CommonErrorText role="alert" id="passwordCheckError">
            {passwordCheckError}
          </st.CommonErrorText>
        </div>
        <st.GenderAriaContainer>
          <st.IdAreaExplainText>*성별</st.IdAreaExplainText>
          <st.GenderLabelContainer htmlFor="isAgreeForGender">
            {genders.map((gender) => (
              <st.OriginalButton
                ref={userGenderRef}
                key={gender}
                type="button"
                buttonName="gender"
                onClick={() => handleGenderClick(gender)}
                active={activeGender === gender}
              >
                {gender}
              </st.OriginalButton>
            ))}
          </st.GenderLabelContainer>
          <st.AgreeLable>
            <st.CommonAgreeForInfoInput
              type="checkbox"
              id="isAgreeForGender"
              onChange={handleAgreeForGender}
              aria-describedby="agreeForGenderError"
            />
            <st.CommonAgreeForInfoText>
              (필수)개인정보 이용 및 제 3자 제공에 동의합니다.
            </st.CommonAgreeForInfoText>
            <st.CommonErrorText role="alert" id="agreeForGenderError">
              {genderError}
            </st.CommonErrorText>
          </st.AgreeLable>
        </st.GenderAriaContainer>
        <div>
          <st.IdAreaExplainText>*연령</st.IdAreaExplainText>
          <st.AgeAriaContainer>
            {ageList.map((age) => (
              <st.OriginalButton
                key={age}
                type="button"
                buttonName="age"
                onClick={() => handleAgeClick(age)}
                active={activeAge === age}
                aria-describedby="ageError"
              >
                {age}
              </st.OriginalButton>
            ))}
          </st.AgeAriaContainer>
          <st.AgreeLable>
            <st.CommonAgreeForInfoInput
              type="checkbox"
              id="isAgreeForAge"
              onChange={handleAgreeForAge}
              aria-describedby="agreeForAgeError"
            />
            <st.CommonAgreeForInfoText>
              (필수)개인정보 이용 및 제 3자 제공에 동의합니다.
            </st.CommonAgreeForInfoText>
            <st.CommonErrorText role="alert" id="agreeForAgeError">
              {ageError}
            </st.CommonErrorText>
          </st.AgreeLable>
        </div>
      </st.UserInfoContainer>
      <st.OriginalButton
        type="submit"
        buttonName="signUp"
        onClick={handleSignUpBtnClick}
      >
        가입하기
      </st.OriginalButton>
    </st.ContainerForm>
  );
}

export default SignUp;
