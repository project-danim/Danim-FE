import { useState } from "react";
import { useRecoilState } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  tripEndDateState,
  tripStartDateState,
} from "../../recoil/post/postState";
import convertDateFormat from "../../utils/convertDateFormat";

function TripDatePicker() {
  // 변환되어 recoil로 전달될 state
  const [, setTripStartDate] = useRecoilState(tripStartDateState);
  const [, setTripEndDate] = useRecoilState(tripEndDateState);

  // DatePicker 에서 사용될 날짜 state
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

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
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleStartChange}
        selectsStart
        startDate={startDate}
        dateFormat="yyyy년 MM월 dd일"
        endDate={endDate}
        minDate={new Date()} // 오늘 이전의 날짜는 선택 불가능
        isClearable
        placeholderText="다님이 출발할 날짜를 알려주세요."
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndChange}
        selectsEnd
        startDate={startDate}
        dateFormat="yyyy년 MM월 dd일"
        endDate={endDate}
        minDate={startDate} // 시작 날짜 이전의 날짜는 선택 불가능
        isClearable
        placeholderText="다님이 끝날 날짜를 알려주세요."
      />
    </div>
  );
}

export default TripDatePicker;
