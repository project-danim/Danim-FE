import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState, useRecoilValue } from "recoil";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  recruitmentEndDateState,
  recruitmentStartDateState,
} from "../../recoil/post/postCreateState";
import convertDateFormat from "../../utils/convertDateFormat";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";

// DatePicker 스타일링 - Start
const CustomStartInput = React.forwardRef(({ value, onClick }, ref) => (
  <StyledInput onClick={onClick} ref={ref}>
    {value || "출발 날짜를 알려주세요."}
  </StyledInput>
));

// DatePicker 스타일링 - End
const CustomEndInput = React.forwardRef(({ value, onClick }, ref) => (
  <StyledInput onClick={onClick} ref={ref}>
    {value || "도착 날짜를 알려주세요."}
  </StyledInput>
));

const StyledInput = styled.div`
  border: 0.5px solid #a3a3a3;
  font-size: 16px;
  box-sizing: border-box;
  padding: 9.5px 0;
  padding-left: 12px;
  width: 100%;
  line-height: 22px;
  border-radius: 8px;
  color: #a3a3a3;
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

const DatePickerWrapper = styled.div`
  width: 100%;
  /* margin: 5px; */
`;

function RecruitmentDatePicker() {
  // 모집이 종료될 날짜와 연결된 recoil state, start state 는 recoil에서 별도 정의
  const [, setRecruitmentStartDate] = useRecoilState(recruitmentStartDateState);
  const [, setRecruitmentEndDate] = useRecoilState(recruitmentEndDateState);

  // 글 수정 - 서버에서 가져온 PostState에서 tripEndDate, tripStartDate 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { recruitmentStartDate, recruitmentEndDate } = getPostData || {};

  // 수정중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  const today = new Date();

  // 초기값을 null로 설정
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // recruitmentStartDate나 recruitmentEndDate가 변경되었을 때 startDate와 endDate를 업데이트
  useEffect(() => {
    if (postIsEditing) {
      if (recruitmentStartDate) {
        setStartDate(new Date(recruitmentStartDate));
      }
      if (recruitmentEndDate) {
        setEndDate(new Date(recruitmentEndDate));
      }
    }
  }, [postIsEditing, recruitmentStartDate, recruitmentEndDate]);

  // 모집 시작 날짜) 날짜가 선택될 때 - 날짜 형식 변환, state변환, recoil state 전달
  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = convertDateFormat(date);
      setStartDate(date);
      setRecruitmentStartDate(formattedDate);
    }
  };

  // 모집 마지막 날짜) 날짜가 선택될 때 - 날짜 형식 변환, state변환, recoil state 전달
  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = convertDateFormat(date);
      setEndDate(date);
      setRecruitmentEndDate(formattedDate);
    }
  };

  return (
    <Container>
      <DatePickerWrapper>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="yyyy년 MM월 dd일"
          minDate={today} // 오늘 날짜를 포함한 그 이후 날짜만 선택 가능
          placeholderText="시작 날짜 선택"
          customInput={<CustomStartInput />}
        />
      </DatePickerWrapper>
      <DatePickerWrapper>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="yyyy년 MM월 dd일"
          minDate={startDate} // 시작 날짜 이전의 날짜는 선택 불가능
          isClearable
          placeholderText="종료 날짜 선택"
          customInput={<CustomEndInput />}
        />
      </DatePickerWrapper>
    </Container>
  );
}

export default RecruitmentDatePicker;
