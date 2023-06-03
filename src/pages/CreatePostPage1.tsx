import {
  AgeRange,
  Gender,
  Keywords,
  Location,
  RecruitmentDatePicker,
  TripDatePicker,
  RecruitmentCouter,
} from "../components/createPostPage1";

function CreatePostPage1() {
  return (
    <div>
      <h6>다님의 목적을 알려주세요.</h6>
      <Keywords />
      <h3>어디서 모이나요?</h3>
      <Location />
      <h3>누구와 함께하고 싶나요?</h3>
      <p>*중복선택가능</p>
      <Gender />
      <AgeRange />
      <h3>모집기한</h3>
      <RecruitmentDatePicker />
      <h3>여행 시작 - 끝 날짜</h3>
      <RecruitmentCouter />
      <h3>여행 시작 - 끝 날짜</h3>
      <TripDatePicker />
    </div>
  );
}

export default CreatePostPage1;
