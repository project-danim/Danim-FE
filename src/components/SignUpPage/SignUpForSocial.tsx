import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import st from "./SignUpST";
import { fetchSignUpForSocial } from "../../api/signUp";
import { UserInfoForKakao } from "../../types/userType";
import { ageList } from "../HomePage/FilterListData";

function SignUpForSocial() {
  const userId = localStorage.getItem("id");

  // 성별, 나이 입력값 state
  const [activeGender, setActiveGender] = useState("");
  const userGenderRef = useRef<HTMLButtonElement>(null);
  const [activeAge, setActiveAge] = useState("");

  // 성별, 연령대 에러 메세지 상태
  const [, setGenderError] = useState("");
  const [, setAgeError] = useState("");

  // 전체 동의, 성별 정보 동의, 연령 정보 동의, 개인정보 이용 동의에 대한 상태
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeAge, setAgreeAge] = useState(false);
  const [agreeGender, setAgreeGender] = useState(false);
  const [agreeUsingInfo, setAgreeUsingInfo] = useState(false);

  // 네비게이트 생성
  const navigate = useNavigate();

  // 성별 정보 배열
  const genders = ["남", "여"];

  // 성별 선택값 유효성 검사
  useEffect(() => {
    if (activeGender) {
      setGenderError("");
    }
  }, [activeGender]);

  // 성별 클릭 핸들러, 성별 정보 제공 핸들러
  const handleGenderClick = (gender: string) => {
    setActiveGender(gender);
  };
  const handleAgreeForGender = () => {
    const nextAgreeGender = !agreeGender;
    setAgreeGender(nextAgreeGender);
    if (!nextAgreeGender) setAgreeAll(false);
  };

  // 연령 유효성 검사
  useEffect(() => {
    if (activeAge) {
      setAgeError("");
    }
  }, [activeAge]);

  // 연령 클릭 핸들러, 연령 정보 제공 핸들러
  const handleAgeClick = (age: string) => {
    setActiveAge(age);
  };
  const handleAgreeForAge = () => {
    const nextAgreeAge = !agreeAge;
    setAgreeAge(nextAgreeAge);
    if (!nextAgreeAge) setAgreeAll(false);
  };

  // 개인정보 이용 동의 핸들러
  const handleAgreeUsingInfo = () => {
    const nextAgreeUsingInfo = !agreeUsingInfo;
    setAgreeUsingInfo(() => nextAgreeUsingInfo);
    if (!nextAgreeUsingInfo) setAgreeAll(false);
  };

  // 전체 동의 클릭 핸들러
  const handleAgreeAll = () => {
    const nextAgreeAllState = !agreeAll;
    setAgreeAll(nextAgreeAllState);
    setAgreeGender(nextAgreeAllState);
    setAgreeAge(nextAgreeAllState);
    setAgreeUsingInfo(nextAgreeAllState);
  };

  // 성별 정보 동의와 연령 정보 동의가 개별적으로 모두 이루어졌을때
  useEffect(() => {
    if (agreeAge && agreeGender && agreeUsingInfo) {
      setAgreeAll(() => true);
    }
  }, [agreeAge, agreeGender, agreeUsingInfo]);

  // 회원가입 뮤테이션 함수
  const { mutate: mutateSignUpForSocial } = useMutation(fetchSignUpForSocial, {
    onSuccess: (response) => {
      if (response.message === "로그인 성공") {
        alert("회원가입이 완료되었습니다!");
        navigate("/");
      }
    },
    onError: () => {
      alert("요청이 실패했습니다. 다시 시도해주세요!");
    },
  });

  // 회원가입 버튼 클릭시
  const handleSignUpBtnClick = () => {
    // 성별, 연령 값이 없거나 정보 제공에 동의하지 않은 경우
    if (!activeGender) {
      userGenderRef.current?.focus();
      setGenderError("성별을 선택해주세요.");
      return;
    }
    if (!activeAge) {
      setAgeError("연령을 선택해주세요.");
      return;
    }
    if (!agreeGender) {
      alert("성별 정보 제공에 동의해주세요.");
      return;
    }
    if (!agreeAge) {
      alert("연령 정보 제공에 동의해주세요.");
      return;
    }
    if (!agreeUsingInfo) {
      alert("개인정보 이용에 동의해주세요.");
      return;
    }

    // 로컬에 저장된 사용자 아이디가 있을 경우만 회원가입 요청
    if (userId) {
      const user: UserInfoForKakao = {
        userId,
        gender: activeGender,
        ageRange: activeAge,
        agreeForGender: true,
        agreeForAge: true,
      };
      mutateSignUpForSocial(user);
    }
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
          {/* <st.AgreeLable>
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
          </st.AgreeLable> */}
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
        </div>
      </st.UserInfoContainer>
      <st.AgreeContainer>
        <label htmlFor="agreeForAll">
          <st.CommonAgreeForInfoInput
            type="checkbox"
            id="agreeForAll"
            checked={agreeAll}
            onChange={handleAgreeAll}
          />
          <st.CommonAgreeForInfoText>약관 전체 동의</st.CommonAgreeForInfoText>
        </label>
        <label htmlFor="agreeForGender">
          <st.CommonAgreeForInfoInput
            type="checkbox"
            id="agreeForGender"
            checked={agreeGender}
            onChange={handleAgreeForGender}
          />
          <st.CommonAgreeForInfoText>
            (필수) 성별 정보 제공 동의
          </st.CommonAgreeForInfoText>
        </label>
        <label htmlFor="agreeForAge">
          <st.CommonAgreeForInfoInput
            type="checkbox"
            id="agreeForAge"
            checked={agreeAge}
            onChange={handleAgreeForAge}
          />
          <st.CommonAgreeForInfoText>
            (필수) 연령 정보 제공 동의
          </st.CommonAgreeForInfoText>
        </label>
        <label htmlFor="agreeForOfferInfo">
          <st.CommonAgreeForInfoInput
            type="checkbox"
            id="agreeForOfferInfo"
            checked={agreeUsingInfo}
            onChange={handleAgreeUsingInfo}
          />
          <st.CommonAgreeForInfoText>
            (필수) 개인정보 이용 및 제 3자 제공에 동의합니다.
          </st.CommonAgreeForInfoText>
        </label>
      </st.AgreeContainer>
      <st.OriginalButton
        type="submit"
        buttonName="signUp"
        onClick={handleSignUpBtnClick}
      >
        SNS로 회원가입
      </st.OriginalButton>
    </st.ContainerForm>
  );
}

export default SignUpForSocial;
