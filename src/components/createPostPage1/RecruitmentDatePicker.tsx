import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";
import { recruitmentEndDateState, recruitmentStartDateState } from "../../recoil/post/postState";

function RecruitmentDatePicker() {
  const [recruitmentEndDate, setRecruitmentEndDate] = useRecoilState(recruitmentEndDateState);
  const [recruitmentStartDate] = useRecoilState(recruitmentStartDateState);

  const handleDateChange: (date: Date | null) => void = (date) => {
    setRecruitmentEndDate(date);
  };

  return (
    <div>
      <DatePicker
        selected={recruitmentEndDate}
        onChange={handleDateChange}
        selectsEnd
        startDate={recruitmentStartDate}
        endDate={recruitmentEndDate}
        minDate={new Date()} // 오늘 날짜를 포함한 그 이후 날짜만 선택 가능
        isClearable
        placeholderText="끝 날짜 선택"
      />
    </div>
  );
}

export default RecruitmentDatePicker;
