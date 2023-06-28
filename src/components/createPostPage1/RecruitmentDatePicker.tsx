import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState, useRecoilValue } from "recoil";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  recruitmentEndDateState,
  recruitmentStartDateState,
  tripEndDateState,
} from "../../recoil/post/postCreateState";
import convertDateFormat from "../../utils/convertDateFormat";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";

const StyledInput = styled.div`
  border: 0.5px solid #a3a3a3;
  font-size: 16px;
  box-sizing: border-box;
  padding: 9.5px 0;
  padding-left: 12px;
  width: 100%;
  line-height: 22px;
  border-radius: 8px;
  color: #5c5c5c;
  @media (max-width: 375px) {
    font-size: 13px;
  }
`;

const Container = styled.div`
  display: flex;
  /* margin: 17px 0; */
`;

const DatePickerWrapper = styled.div`
  width: 100%;
`;

const NoticeTextWrapper = styled.div`
  font-size: 10px;
  color: #858585;
  margin: 3px;
`;

type Props = {
  value?: string;
  onClick?: () => void;
};

const defaultProps: Props = {
  value: "",
  onClick: () => {},
};

// DatePicker 스타일링 - End
const CustomEndInput = React.forwardRef<HTMLDivElement, Props>(
  ({ value, onClick }, ref) => (
    <StyledInput onClick={onClick} ref={ref}>
      {value || "모집 마감 일자를 알려주세요."}
    </StyledInput>
  )
);
CustomEndInput.displayName = "CustomEndInput";
CustomEndInput.defaultProps = defaultProps;

function RecruitmentDatePicker() {
  // recoil state
  const [, setRecruitmentStartDate] = useRecoilState(recruitmentStartDateState);
  const [, setRecruitmentEndDate] = useRecoilState(recruitmentEndDateState);

  // 글 수정 - 서버에서 가져온 PostState에서 tripEndDate, tripStartDate 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { recruitmentStartDate, recruitmentEndDate } = getPostData || {};

  // 수정중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  const today = new Date();

  const [tripEndDate] = useRecoilState(tripEndDateState);
  const tripEndDateObj = tripEndDate ? new Date(tripEndDate) : null;

  // 초기값을 null로 설정
  const [, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // recruitmentStartDate나 recruitmentEndDate가 변경되었을 때 startDate와 endDate를 업데이트
  useEffect(() => {
    if (postIsEditing) {
      if (recruitmentStartDate) {
        const startDateObj = new Date(recruitmentStartDate);
        setStartDate(startDateObj);
        setRecruitmentStartDate(convertDateFormat(startDateObj));
      }
      if (recruitmentEndDate) {
        const endDateObj = new Date(recruitmentEndDate);
        setEndDate(endDateObj);
        setRecruitmentEndDate(convertDateFormat(endDateObj));
      }
    }
  }, [postIsEditing, recruitmentStartDate, recruitmentEndDate]);

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
      {/* 🐼 */}
      {/* {postIsEditing ? (
        <NoticeTextWrapper>모집 마감 일자를 알려주세요.</NoticeTextWrapper>
      ) : null} */}
      <DatePickerWrapper>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="yyyy년 MM월 dd일"
          minDate={today} // 시작 날짜 이전의 날짜는 선택 불가능
          maxDate={tripEndDateObj} // 여행 종료일 이후는 모집이 불가능
          placeholderText="종료 날짜 선택"
          customInput={<CustomEndInput />}
        />
      </DatePickerWrapper>
    </Container>
  );
}

export default RecruitmentDatePicker;
