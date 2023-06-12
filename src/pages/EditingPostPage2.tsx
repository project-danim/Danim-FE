import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect } from "react";
import { ScheduleMap, TextImageInput } from "../components/CreatePostPage2";
import { PostGetState, postIdState } from "../recoil/post/postGetState";
import { editPost } from "../api/post";
import postIsEditingState from "../recoil/post/postIsEditingState";

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

  // 서버에서 가져왔던 state들 중 수정되어 서버로 보낼 state만 추출
  const postData = useRecoilValue(PostGetState);
  const {
    postTitle,
    recruitmentStartDate,
    recruitmentEndDate,
    tripStartDate,
    tripEndDate,
    groupSize,
    location,
    keyword,
    content,
    mapAPI,
    ageRange,
    gender,
    imageUrls,
  } = postData;

  const isEditingPostData = {
    postTitle,
    recruitmentStartDate,
    recruitmentEndDate,
    tripStartDate,
    tripEndDate,
    groupSize,
    location,
    keyword,
    content,
    mapAPI,
    ageRange,
    gender,
    imageUrls,
  };
  // console.log(isEditingPostData);

  // 서버로 값을 전송
  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(isEditingPostData).forEach((key) => {
      if (key === "MapAPI") {
        formData.append(key, JSON.stringify(isEditingPostData[key]));
      } else {
        formData.append(key, isEditingPostData[key]);
      }
      // console.log("Content:", isEditingPostData.content);
      // console.log("Image URLs:", isEditingPostData.imageUrls);
    });

    // console.log("Content:", isEditingPostData.content);
    // console.log("Image URLs:", isEditingPostData.imageUrls);

    try {
      const response = await editPost(postId, formData);
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
        수정하기
      </button>
    </div>
  );
}

export default EditingPostPage2;
