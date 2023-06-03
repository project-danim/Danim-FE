import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TripDatePicker() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // console.log(`여행 시작 날짜`, startDate);
  // console.log(`여행 끝나는 날짜`, endDate);

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        minDate={new Date()} // 오늘 이전의 날짜는 선택 불가능
        isClearable
        placeholderText="다님이 출발할 날짜를 알려주세요."
      />
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate} // 시작 날짜 이전의 날짜는 선택 불가능
        isClearable
        placeholderText="다님이 끝날 날짜를 알려주세요."
      />
    </div>
  );
}

export default TripDatePicker;
