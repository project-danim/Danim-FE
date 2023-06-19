import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ScheduleMap, TextImageInput } from "../components/CreatePostPage2";
import { postIdState } from "../recoil/post/postGetState";
import { editPost } from "../api/post";
import postIsEditingState from "../recoil/post/postIsEditingState";
import postCreateState from "../recoil/post/postCreateSelector";
import * as Styled from "./CreateEditPostPageStyles";

function EditingPostPage2() {
  // 글이 수정될때 postIsEditing state 를 true 로 변경
  const [, setPostIsEditing] = useRecoilState(postIsEditingState);
  const [postId] = useRecoilState(postIdState);

  useEffect(() => {
    setPostIsEditing(true);
    return () => {
      setPostIsEditing(false); // 컴포넌트가 언마운트될 때(글 수정이 완료) postIsEditing state를 false로 변경
    };
  }, [setPostIsEditing]);

  const postData: any = useRecoilValue(postCreateState);

  console.log(postData);
  const navigate = useNavigate();

  // 작성 완료 버튼 - 서버로 값을 전송
  const handleSubmit = async () => {
    const formData = new FormData();
    // console.log(formData);

    Object.keys(postData).forEach((key) => {
      if (key === "MapAPI") {
        formData.append(key, JSON.stringify(postData[key]));
      } else {
        formData.append(key, postData[key]);
      }
    });

    try {
      const response = await editPost(postId, formData);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  // 이전 버튼
  const handleBeforeClick = () => {
    navigate(`/edit-post/step1/${postId}`);
  };

  return (
    <Styled.Container>
      <Styled.VerticalLineWrapper>
        <Styled.VerticalLineStyle />
        <Styled.VerticalLineStyle />
      </Styled.VerticalLineWrapper>
      <Styled.ContentsContainer>
        <Styled.MainInfotextWrapper>
          <Styled.TitleWrapper>
            <Styled.CircleNumbering>2</Styled.CircleNumbering>
            <Styled.MainInfotext>게시글을 작성해 주세요.</Styled.MainInfotext>
          </Styled.TitleWrapper>
        </Styled.MainInfotextWrapper>
        <TextImageInput />

        <Styled.Wrapper2>
          <Styled.TitleWrapper>
            <Styled.CircleNumbering>3</Styled.CircleNumbering>
            <Styled.MainInfotext>
              (선택)상세 일정을 등록해 주세요.
            </Styled.MainInfotext>
          </Styled.TitleWrapper>
        </Styled.Wrapper2>
        <ScheduleMap />

        <Styled.ButtonRouterWrapper>
          <Styled.RouterButton onClick={handleBeforeClick}>
            이전
          </Styled.RouterButton>
          <Styled.RouterButton onClick={handleSubmit}>
            작성 완료
          </Styled.RouterButton>
        </Styled.ButtonRouterWrapper>
      </Styled.ContentsContainer>
    </Styled.Container>
  );
}

export default EditingPostPage2;
