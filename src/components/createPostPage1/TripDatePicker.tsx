import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import {
  recruitmentEndDateState,
  recruitmentStartDateState,
  tripEndDateState,
  tripStartDateState,
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
`;

const DatePickerWrapper = styled.div`
  width: 100%;
  margin: 5px;
`;

function TripDatePicker() {
  // 변환되어 recoil로 전달될 state
  const [, setTripStartDate] = useRecoilState(tripStartDateState);
  const [, setTripEndDate] = useRecoilState(tripEndDateState);

  // 글 수정 - 서버에서 가져온 PostState에서 tripEndDate, tripStartDate 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { tripEndDate, tripStartDate } = getPostData || {};

  // 수정중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  // DatePicker 에서 사용될 날짜 state
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // tripStartDate나 tripEndDate가 변경되었을 때 startDate와 endDate를 업데이트
  useEffect(() => {
    if (postIsEditing) {
      if (tripStartDate) {
        const startDateObj = new Date(tripStartDate);
        setStartDate(startDateObj);
        setTripStartDate(convertDateFormat(startDateObj));
      }
      if (tripEndDate) {
        const endDateObj = new Date(tripEndDate);
        setEndDate(endDateObj);
        setTripEndDate(convertDateFormat(endDateObj));
      }
    }
  }, [postIsEditing, tripStartDate, tripEndDate]);

  // 출발) 날짜가 선택될 때 - state변환, recoil state 전달
  const handleStartChange = (date: Date | null) => {
    if (date) {
      const formattedDate = convertDateFormat(date);
      setStartDate(date);
      setTripStartDate(formattedDate);
    }
  };

  // 도착) 날짜가 선택될 때 - state변환, recoil state 전달
  const handleEndChange = (date: Date | null) => {
    if (date) {
      const formattedDate = convertDateFormat(date);
      setEndDate(date);
      setTripEndDate(formattedDate);
    }
  };

  return (
    <Container>
      <DatePickerWrapper>
        <DatePicker
          selected={startDate}
          onChange={handleStartChange}
          selectsStart
          startDate={startDate}
          dateFormat="yyyy년 MM월 dd일"
          endDate={endDate}
          minDate={new Date()} // 오늘 이전의 날짜는 선택 불가능
          placeholderText="다님이 출발할 날짜를 알려주세요."
          customInput={<CustomStartInput />}
        />
      </DatePickerWrapper>
      <DatePickerWrapper>
        <DatePicker
          selected={endDate}
          onChange={handleEndChange}
          selectsEnd
          startDate={startDate}
          dateFormat="yyyy년 MM월 dd일"
          endDate={endDate}
          minDate={startDate} // 시작 날짜 이전의 날짜는 선택 불가능
          placeholderText="다님이 끝날 날짜를 알려주세요."
          customInput={<CustomEndInput />}
        />
      </DatePickerWrapper>
    </Container>
  );
}
export default TripDatePicker;
