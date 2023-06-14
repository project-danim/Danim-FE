import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import {
  AgeRange,
  Gender,
  Keywords,
  Location,
  PostTitle,
  RecruitmentCouter,
  RecruitmentDatePicker,
  TripDatePicker,
} from "../components/CreatePostPage1";
import { postIdState } from "../recoil/post/postGetState";
import postIsEditingState from "../recoil/post/postIsEditingState";
import * as Styled from "./PostPageStyles";

function EditingPostPage1() {
  // 글이 수정될때 postIsEditing state 를 true 로 변경
  const [postIsEditing, setPostIsEditing] = useRecoilState(postIsEditingState);
  useEffect(() => {
    setPostIsEditing(true);
  }, [setPostIsEditing]);

  // 다음 edit page로 이동하기 위한 posId
  const [postId] = useRecoilState(postIdState);

  const navigate = useNavigate();

  const handleBeforeClick = () => {
    navigate("/");
  };

  const handleNextClick = () => {
    navigate(`/edit-post/step2/${postId}`);
  };

  return (
    <Styled.Container>
      <Styled.Wrapper1>
        <Styled.TitleWrapper>
          <Styled.CircleNumbering>1</Styled.CircleNumbering>
          <Styled.MainInfotext>
            메인 페이지에 노출 될 기본 정보를 알려주세요.
          </Styled.MainInfotext>
        </Styled.TitleWrapper>
      </Styled.Wrapper1>

      <Styled.Wrapper1>
        <Styled.SubInfotext>다님의 목적을 알려주세요.</Styled.SubInfotext>
        <Keywords />
      </Styled.Wrapper1>

      <Styled.Wrapper1>
        <Styled.SubInfotext>어디서 함께하시나요?</Styled.SubInfotext>
        <Location />
        <TripDatePicker />
      </Styled.Wrapper1>

      <Styled.Wrapper1>
        <Styled.SubInfotext>
          어떤 사람들과 함께 하시고 싶나요?
          <p>* 중복선택 가능</p>
        </Styled.SubInfotext>
        <Styled.GenderAgeWrapper>
          <Styled.GenderWrapper>
            <Gender />
          </Styled.GenderWrapper>
          <Styled.AgeWrapper>
            <AgeRange />
          </Styled.AgeWrapper>
        </Styled.GenderAgeWrapper>
      </Styled.Wrapper1>

      <Styled.Wrapper1>
        <Styled.SubInfotext>
          키워드로 글을 작성하면 같이 다닐 확률이 높아져요!
        </Styled.SubInfotext>
        <PostTitle />
        <RecruitmentDatePicker />
        <RecruitmentCouter />
      </Styled.Wrapper1>

      <Styled.ButtonRouterWrapper>
        <Styled.RouterButton onClick={handleBeforeClick}>
          이전
        </Styled.RouterButton>
        <Styled.RouterButton onClick={handleNextClick}>
          다음
        </Styled.RouterButton>
      </Styled.ButtonRouterWrapper>
    </Styled.Container>
  );
}

export default EditingPostPage1;
