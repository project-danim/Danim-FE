import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  AgeRange,
  Gender,
  Keywords,
  Location,
  RecruitmentDatePicker,
  TripDatePicker,
  RecruitmentCouter,
} from "../components/createPostPage1";

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

function CreatePostPage1() {
  return (
    <div>
      <p>메인 페이지에 노출 될 기본 정보를 알려주세요.</p>
      <p>메인 페이지에 노출 될 기본 정보를 알려주세요.</p>
      <p>다님의 목적을 알려주세요.</p>
      <Keywords />
      <p>어디서 함께하시나요?</p>
      <Location />
      <TripDatePicker />
      <p>어떤 사람들과 함께 하시고 싶나요?</p>
      <p>* 중복선택 가능</p>
      <Gender />
      <AgeRange />
      <p>키워드로 글을 작성하면 같이 다닐 확률이 높아져요!</p>
      <RecruitmentDatePicker />
      <p>모집 인원을 알려주세요</p>
      <RecruitmentCouter />
      <StyledLink to="/create-post/step2">다음</StyledLink>
    </div>
  );
}

export default CreatePostPage1;
