import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import {
  AgeRange,
  Gender,
  Keywords,
  Location,
  RecruitmentCouter,
  RecruitmentDatePicker,
  TripDatePicker,
} from "../components/CreatePostPage1";
import { postIdState } from "../recoil/post/postGetState";
import postIsEditingState from "../recoil/post/postIsEditingState";

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

function EditingPostPage1() {
  // 글이 수정될때 postIsEditing state 를 true 로 변경
  const [postIsEditing, setPostIsEditing] = useRecoilState(postIsEditingState);
  useEffect(() => {
    setPostIsEditing(true);
  }, [setPostIsEditing]);

  // 다음 edit page로 이동하기 위한 posId
  const [postId] = useRecoilState(postIdState);

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
      <StyledLink to={`/edit-post/step2/${postId}`}>다음</StyledLink>
    </div>
  );
}

export default EditingPostPage1;
