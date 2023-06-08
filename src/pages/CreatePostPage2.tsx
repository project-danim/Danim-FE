import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { createPost } from "../api/post";
import { ScheduleMap, TextImageInput } from "../components/CreatePostPage2";
import postCreateState from "../recoil/post/postCreateSelector";
import postIsEditingState from "../recoil/post/postIsEditingState";

function CreatePostPage2() {
  // 컴포넌트가 랜더링 될때 수정 중이 아니라는것을 알려주기 위해 postIsEditing 속성을 false로
  const [postIsEditing, setPostIsEditing] = useRecoilState(postIsEditingState);
  useEffect(() => {
    setPostIsEditing(false);
  }, [setPostIsEditing]);

  // 현재까지 글을 작성하면서 recoil의 상태에 저장해 두었던 값들을 가져옴
  const postData: any = useRecoilValue(postCreateState);

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
    <div>
      <h3>글 작성</h3>
      <TextImageInput />
      <h3>스케줄지도</h3>
      <ScheduleMap />
      <button type="button" onClick={handleSubmit}>
        모임만들기
      </button>
    </div>
  );
}

export default CreatePostPage2;
