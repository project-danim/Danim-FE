import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/post";
import { ScheduleMap, TextImageInput } from "../components/CreatePostPage2";
import postCreateState from "../recoil/post/postCreateSelector";
import postIsEditingState from "../recoil/post/postIsEditingState";
import * as Styled from "./PostPageStyles";

function CreatePostPage2() {
  // 컴포넌트가 랜더링 될때 수정 중이 아니라는것을 알려주기 위해 postIsEditing 속성을 false로
  const [, setPostIsEditing] = useRecoilState(postIsEditingState);
  useEffect(() => {
    setPostIsEditing(false);
  }, [setPostIsEditing]);

  const navigate = useNavigate();

  // 현재까지 글을 작성하면서 recoil의 상태에 저장해 두었던 값들을 가져옴
  const postData: any = useRecoilValue(postCreateState);

  const handleBeforeClick = () => {
    navigate("/create-post/step1");
  };

  // 서버로 값을 전송
  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(postData).forEach((key) => {
      if (key === "MapAPI") {
        formData.append(key, JSON.stringify(postData[key]));
      } else {
        formData.append(key, postData[key]);
      }
    });

    try {
      const response = await createPost(formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Styled.Container>
      <Styled.Wrapper2>
        <Styled.TitleWrapper>
          <Styled.CircleNumbering>2</Styled.CircleNumbering>
          <Styled.MainInfotext>게시글을 작성해 주세요.</Styled.MainInfotext>
        </Styled.TitleWrapper>
      </Styled.Wrapper2>
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
    </Styled.Container>
  );
}

export default CreatePostPage2;
