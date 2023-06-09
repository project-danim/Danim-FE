import { useRef, useEffect } from "react";
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

  // 글 수정 - 서버에서 가져온 PostState에서 content와 imageUrls 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { content, imageUrls } = getPostData || {};

  // 수정중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  // 테그들과 이미지url이 포함된 작성자가 작성한 contents
  const [quillContent, setQuillContent] = useRecoilState(tripPostContentState);
  console.log(quillContent);

  // 서버에서 전달받은 이미지 urls []
  const [returnImageUrls, setReturnImageUrls] = useRecoilState(imageUrlsState);

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
      setReturnImageUrls((prevUrls) => [...prevUrls, imageUrl]);
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
    setQuillContent(value);
  };

  // if editing, initialize the content and images
  useEffect(() => {
    if (postIsEditing && quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.setContents(quill.clipboard.convert(content || ""));
      setQuillContent(content || "");
      setReturnImageUrls(imageUrls || []);
    }
  }, [postIsEditing, content, imageUrls]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={quillContent}
        modules={modules}
        onChange={handleQuillChange}
      />
    </div>
  );
}

export default TextImageInput;
