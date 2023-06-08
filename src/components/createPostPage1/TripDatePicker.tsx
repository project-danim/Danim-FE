import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  tripEndDateState,
  tripStartDateState,
} from "../../recoil/post/postCreateState";
import convertDateFormat from "../../utils/convertDateFormat";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";

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
  // const [startDate, setStartDate] = useState<Date | null>(new Date());
  // const [endDate, setEndDate] = useState<Date | null>(null);

  // postIsEditing 이 true이고 tripStart/endDate 가 있다면 그 값을 보여주고 false라면 값을 선택하게 출력
  const [startDate, setStartDate] = useState<Date | null>(
    postIsEditing && tripStartDate ? new Date(tripStartDate) : new Date()
  );
  const [endDate, setEndDate] = useState<Date | null>(
    postIsEditing && tripEndDate ? new Date(tripEndDate) : null
  );

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
