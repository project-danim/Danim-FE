import { useState, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "react-query";
import {
  imageUrlsState,
  tripPostContentState,
} from "../../recoil/post/postCreateState";
import { uploadImage } from "../../api/post";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";

function TextImageInput() {
  const quillRef = useRef<ReactQuill | null>(null);
  const [quillText, setQuillText] = useState<string>("");

  // 글 수정 - 서버에서 가져온 PostState에서 keyword 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { content } = getPostData || {};

  // 수정중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  // 테그들과 이미지url이 포함된 작성자가 작성한 contents
  const [quillContent, setQuillContent] = useRecoilState(tripPostContentState);

  // 서버에서 전달받은 이미지 urls []
  const [imageUrls, setImageUrls] = useRecoilState(imageUrlsState);
  console.log(imageUrls);

  const uploadImageMutation = useMutation(uploadImage);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data: imageUrl } = await uploadImageMutation.mutateAsync(
        formData
      );
      // 서버에서 전달받은 이미지 urls 업데이트
      setImageUrls([...imageUrls, imageUrl]);
      const quill = quillRef.current?.getEditor();
      const range = quill?.getSelection();

      // 서버에서 되돌아온 이미지 url을 에디터에 넣어줄 위치 지정
      let index = 0;
      if (range) {
        index = range.index;
      }
      if (quill) {
        quill.insertEmbed(index, "image", imageUrl);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ["link"]],
  };

  const handleQuillChange = (value: string) => {
    setQuillText(value);
    setQuillContent(value);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        defaultValue={quillText}
        modules={modules}
        onChange={handleQuillChange}
      />
    </div>
  );
}

export default TextImageInput;
