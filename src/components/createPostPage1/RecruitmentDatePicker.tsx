import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import {
  recruitmentEndDateState,
  recruitmentStartDateState,
} from "../../recoil/post/postCreateState";
import convertDateFormat from "../../utils/convertDateFormat";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";

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
  // postIsEditing 이 true이고 recruitmentStart/endDate 가 있다면 그 값을 보여주고 false라면 값을 선택하게 출력
  const [startDate, setStartDate] = useState<Date | null>(
    postIsEditing && recruitmentStartDate
      ? new Date(recruitmentStartDate)
      : today
  );
  const [endDate, setEndDate] = useState<Date | null>(
    postIsEditing && recruitmentEndDate ? new Date(recruitmentEndDate) : null
  );

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = convertDateFormat(date);
      setStartDate(date);
      setRecruitmentStartDate(formattedDate);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = convertDateFormat(date);
      setEndDate(date);
      setRecruitmentEndDate(formattedDate);
    }
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        dateFormat="yyyy년 MM월 dd일"
        minDate={today} // 오늘 날짜를 포함한 그 이후 날짜만 선택 가능
        isClearable
        placeholderText="시작 날짜 선택"
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        dateFormat="yyyy년 MM월 dd일"
        minDate={startDate} // 시작 날짜 이전의 날짜는 선택 불가능
        isClearable
        placeholderText="종료 날짜 선택"
      />
    </div>
  );
}

export default RecruitmentDatePicker;
