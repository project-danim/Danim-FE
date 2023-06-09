import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import useToggle from "../../hooks/useToggle";
import { fetchSignUpForSocial } from "../../api/signUp";
import st from "./SignUpST";
import { UserInfoForKakao } from "../../types/userType";
import userIdState from "../../recoil/login/userInfo";

function SignUpForSocial() {
  const [userIdAtom, setUserId] = useRecoilState(userIdState);

  // 성별, 나이 입력값 state
  const [activeGender, setActiveGender] = useState("");
  const userGenderRef = useRef<HTMLButtonElement>(null);
  const [agreeGender, handleAgreeGender, setAgreeGender] = useToggle(false);
  const [activeAge, setActiveAge] = useState("");
  const [agreeForAge, handleIsAgreeForAge, setIsAgreeForAge] = useToggle(false);

  // 성별, 연령대 에러 메세지 상태
  const [genderError, setGenderError] = useState("");
  const [agreeForGenderError, setAgreeForGenderError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [agreeForAgeError, setAgreeForAgeError] = useState("");

  // 네비게이트 생성
  const navigate = useNavigate();

  // 성별과 연령대 정보 배열
  const genders = ["남", "여"];
  const ages = ["10대(성인)", "20대", "30대", "40대", "50대", "60대 이상"];

  // 성별 선택값 유효성 검사
  useEffect(() => {
    if (activeGender) {
      setGenderError("");
      return;
    }
    if (agreeGender) {
      setAgreeForGenderError("");
    }
  }, [activeGender, agreeGender]);

  // 성별 클릭 핸들러, 성별 정보 제공 핸들러
  const handleGenderClick = (gender: string) => {
    if (gender === "남") {
      setActiveGender("male");
    } else setActiveGender("female");
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

  // 회원가입 뮤테이션 함수
  const { mutate: mutateSignUpForSocial } = useMutation(fetchSignUpForSocial, {
    onSuccess: (response) => {
      if (response.message === "로그인 성공") {
        alert("회원가입이 완료되었습니다!");
        navigate("/");
      }
    },
    onError: (error) => {
      console.log(error);
      alert("요청이 실패했습니다. 다시 시도해주세요!");
    },
  });

  // 회원가입 버튼 클릭시
  const handleSignUpBtnClick = () => {
    // 성별 값이 없거나 정보 제공에 동의하지 않은 경우
    if (!activeGender) {
      userGenderRef.current?.focus();
      setGenderError("성별을 선택해주세요.");
      return;
    }
    if (!agreeGender) {
      setAgreeForGenderError("성별 정보 제공에 동의해주세요.");
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

    const user: UserInfoForKakao = {
      userId: userIdAtom,
      gender: activeGender,
      ageRange: activeAge,
      agreeForGender: true,
      agreeForAge: true,
    };
    mutateSignUpForSocial(user);
  };
  return (
    <st.ContainerForm
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
    >
      <st.FormExplainText pageName="signUpPage">
        추가로 필요한 정보를 입력해 주세요.
      </st.FormExplainText>
      <st.SignUpExplainText>*는 필수 기입 사항입니다.</st.SignUpExplainText>
      <st.UserInfoContainer>
        <st.GenderAriaContainer>
          <st.IdAreaExplainText>*성별</st.IdAreaExplainText>
          <st.GenderLabelContainer htmlFor="gender">
            {genders.map((gender) => (
              <st.GenderButton
                ref={userGenderRef}
                key={gender}
                type="button"
                onClick={() => handleGenderClick(gender)}
                active={activeGender === (gender === "남" ? "male" : "female")}
                aria-describedby="genderError"
              >
                {gender}
              </st.GenderButton>
            ))}
            <st.CommonErrorText role="alert" id="genderError">
              {genderError}
            </st.CommonErrorText>
          </st.GenderLabelContainer>
        </st.GenderAriaContainer>
        <div>
          <st.IdAreaExplainText>*연령</st.IdAreaExplainText>
          <st.AgeAriaContainer htmlFor="age">
            {ages.map((age) => (
              <st.AgeButton
                key={age}
                type="button"
                onClick={() => handleAgeClick(age)}
                active={activeAge === age}
                aria-describedby="ageError"
              >
                {age}
              </st.AgeButton>
            ))}
            <st.CommonErrorText role="alert" id="ageError">
              {ageError}
            </st.CommonErrorText>
          </st.AgeAriaContainer>
        </div>
      </st.UserInfoContainer>

      <div>
        <label htmlFor="agreeForAll">
          <st.CommonAgreeForInfoInput type="checkbox" id="agreeForAll" />
          <st.CommonAgreeForInfoText>약관 전체 동의</st.CommonAgreeForInfoText>
        </label>
        <label htmlFor="agreeForGender">
          <st.CommonAgreeForInfoInput
            type="checkbox"
            id="agreeForGender"
            onChange={handleAgreeForGender}
            aria-describedby="agreeForGenderError"
          />
          <st.CommonAgreeForInfoText>
            (필수)성별 정보 제공 동의
          </st.CommonAgreeForInfoText>
        </label>
        <st.CommonErrorText role="alert" id="agreeForGenderError">
          {agreeForGenderError}
        </st.CommonErrorText>
        <label htmlFor="agreeForAge">
          <st.CommonAgreeForInfoInput
            type="checkbox"
            id="agreeForAge"
            onChange={handleAgreeForAge}
            aria-describedby="agreeForAgeError"
          />
          <st.CommonAgreeForInfoText>
            (필수)연령 정보 제공 동의
          </st.CommonAgreeForInfoText>
        </label>
      </div>
      <st.OriginalButton type="submit" onClick={handleSignUpBtnClick}>
        SNS로 회원가입
      </st.OriginalButton>
    </st.ContainerForm>
  );
}

export default SignUpForSocial;
