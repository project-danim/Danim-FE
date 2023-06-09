import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  AgeRange,
  Gender,
  Keywords,
  Location,
  RecruitmentDatePicker,
  TripDatePicker,
  RecruitmentCouter,
  PostTitle,
} from "../components/CreatePostPage1";
import postIsEditingState from "../recoil/post/postIsEditingState";
import * as Styled from "./CreatePostPage1Styles";

function CreatePostPage1() {
  // 컴포넌트가 랜더링 될때 수정 중이 아니도록 하기 위해 postIsEditing 속성을 false로 설정
  const [, setPostIsEditing] = useRecoilState(postIsEditingState);
  useEffect(() => {
    setPostIsEditing(false);
  }, [setPostIsEditing]);

  const navigate = useNavigate();

  return (
    <Styled.Container>
      <Styled.Wrapper>
        <Styled.TitleWrapper>
          <Styled.CircleNumbering>1</Styled.CircleNumbering>
          <Styled.MainInfotext>
            메인 페이지에 노출 될 기본 정보를 알려주세요.
          </Styled.MainInfotext>
        </Styled.TitleWrapper>
      </Styled.Wrapper>

      <Styled.Wrapper>
        <Styled.SubInfotext>다님의 목적을 알려주세요.</Styled.SubInfotext>
        <Keywords />
      </Styled.Wrapper>

      <Styled.Wrapper>
        <Styled.SubInfotext>어디서 함께하시나요?</Styled.SubInfotext>
        <Location />
        <TripDatePicker />
      </Styled.Wrapper>

      <Styled.Wrapper>
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
      </Styled.Wrapper>

      <Styled.Wrapper>
        <Styled.SubInfotext>
          키워드로 글을 작성하면 같이 다닐 확률이 높아져요!
        </Styled.SubInfotext>
        <PostTitle />
        <RecruitmentDatePicker />
        <RecruitmentCouter />
      </Styled.Wrapper>

      <Styled.StyledLink to="/create-post/step2">다음</Styled.StyledLink>
    </Styled.Container>
  );
}

export default CreatePostPage1;
