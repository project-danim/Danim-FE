import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";
import { tripEndDateState, tripStartDateState } from "../../recoil/post/postState";

function TripDatePicker() {
  const [startDate, setStartDate] = useRecoilState(tripStartDateState);
  const [endDate, setEndDate] = useRecoilState(tripEndDateState);

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
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
        onChange={(date: Date | null) => setEndDate(date)}
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
