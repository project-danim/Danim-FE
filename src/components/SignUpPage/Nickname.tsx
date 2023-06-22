import { useRecoilState } from "recoil";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import st from "./SignUpST";
import { fetchCheckNickname, fetchRandomNickname } from "../../api/signUp";
import {
  isNicknameUniqueState,
  nicknameState,
} from "../../recoil/signUp/userInfo";

interface MyComponentProps {
  nicknameRef: any;
  signUpNicknameError: string;
}

function Nickname({ nicknameRef, signUpNicknameError }: MyComponentProps) {
  // 닉네임 입력값, 닉네임 중복 여부 state
  const [nickname, setUserNickname] = useRecoilState(nicknameState);
  const [isNicknameUnique, setIsNicknameUnique] = useRecoilState(
    isNicknameUniqueState
  );
  // 닉네임 에러 메세지 state
  const [nicknameError, setNicknameError] = useState("");
  // 랜덤 닉네임 값 state
  const [RandomNickname, setRandomNickname] = useState("");

  // 컴포넌트 렌더링시 랜덤 닉네임 받아오기
  useEffect(() => {
    const getRandomNickname = async () => {
      const response = await fetchRandomNickname();
      setRandomNickname(() => response);
    };
    getRandomNickname();
  }, []);
  // 랜덤 닉네임 받아오면 닉네임 입력값 업데이트하기
  useEffect(() => {
    setUserNickname(() => RandomNickname);
  }, [RandomNickname]);

  // 닉네임 입력값 입력 핸들러
  const handleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNickname(() => e.target.value);
  };

  // 닉네임 중복검사 뮤테이션 함수
  const { mutate: mutateCheckNickname } = useMutation(fetchCheckNickname, {
    onSuccess: (response) => {
      if (response === "닉네임 중복 검사 성공") {
        setIsNicknameUnique(true);
        setNicknameError("사용 가능한 닉네임입니다.");
        return;
      }
      if (response === "중복된 닉네임 입니다.") {
        setIsNicknameUnique(false);
        setNicknameError("중복된 닉네임입니다.");
      }
    },
    onError: (err) => {
      throw err;
    },
  });

  // 닉네임 중복 검사
  const handleCheckNicknameBtnClick = () => {
    // 중복 검사 완료된 값으로 재요청 차단
    if (isNicknameUnique) {
      return null;
    }

    // 값이 없는 상태로 중복검사 요청시
    if (nickname === "") {
      nicknameRef.current.focus();
      return setNicknameError("닉네임을 입력하세요.");
    }
    return mutateCheckNickname(nickname);
  };

  // 닉네임 유효성 검사
  useEffect(() => {
    const nicknamePattern = /^[\dA-Za-z가-힣]{3,8}$/;
    const specCharPattern = /[\p{P}\p{S}\s]+/u;
    if (!nickname) {
      setNicknameError("");
      return;
    }
    if (nickname && specCharPattern.test(nickname)) {
      setNicknameError("특수문자는 허용되지 않습니다.");
      return;
    }
    if (nickname && !nicknamePattern.test(nickname)) {
      setNicknameError("한글/영문의 3~8자로 입력하세요.");
      return;
    }
    if (nickname) {
      setIsNicknameUnique(false);
      setNicknameError("닉네임 중복을 확인하세요.");
      return;
    }
    if (nickname !== "" && isNicknameUnique) {
      setNicknameError("사용 가능한 닉네임입니다.");
    }
  }, [nickname]);

  // 컴포넌트 렌더링시 닉네임 초기화
  useEffect(() => {
    setUserNickname("");
    setNicknameError("");
  }, []);

  return (
    <>
      <label htmlFor="userNickname">
        <st.IdAreaExplainText>*닉네임 설정</st.IdAreaExplainText>
        <st.IdAreaContainer>
          <st.CommonInput
            type="text"
            value={nickname}
            onChange={handleChangeNickname}
            ref={nicknameRef}
            id="userNickname"
            placeholder={
              RandomNickname !== "" ? RandomNickname : "닉네임을 입력해주세요."
            }
            aria-describedby="userNicknameError"
            maxLength={8}
            size={28}
          />
          <st.OriginalButton
            type="submit"
            onClick={handleCheckNicknameBtnClick}
            buttonName="checkOverlap"
          >
            중복 확인
          </st.OriginalButton>
        </st.IdAreaContainer>
      </label>
      <st.CommonErrorText role="alert" id="userNicknameError">
        {nicknameError || signUpNicknameError}
      </st.CommonErrorText>
    </>
  );
}

export default Nickname;
