import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RecruitmentDatePicker() {
  const [endDate, setEndDate] = useState<Date | null>(null);
  const today = new Date();

  //   console.log(`모집 시작 날짜`, today);
  //   console.log(`모집 끝나는 날짜`, endDate);

  return (
    <div>
      {/* <DatePicker
        selected={today}
        onChange={() => {}}
        startDate={today}
        endDate={endDate}
        minDate={today} // 오늘 이전의 날짜는 선택 불가능
        isClearable={false}
        placeholderText="시작 날짜 선택"
      /> */}
      <DatePicker
        selected={endDate}
        onChange={(date: Date | null) => setEndDate(date)}
        selectsEnd
        startDate={today}
        endDate={endDate}
        minDate={today} // 오늘 날짜를 포함한 그 이후 날짜만 선택 가능
        isClearable
        placeholderText="끝 날짜 선택"
      />
    </div>
  );
}

export default RecruitmentDatePicker;
