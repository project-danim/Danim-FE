import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { recruitmentEndDateState } from "../../recoil/post/postState";
import convertDateFormat from "../../utils/convertDateFormat";

function RecruitmentDatePicker() {
  // 모집이 종료될 날짜와 연결된 recoil state, start state 는 recoil에서 별도 정의
  const [, setRecruitmentEndDate] = useRecoilState(recruitmentEndDateState);

  const today = new Date();
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleEndChange = (date: Date | null) => {
    if (date) {
      const formattedDate = convertDateFormat(date);
      setEndDate(date);
      setRecruitmentEndDate(formattedDate);
    }
  };

  return (
    <div>
      <DatePicker
        selected={endDate}
        onChange={handleEndChange}
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
