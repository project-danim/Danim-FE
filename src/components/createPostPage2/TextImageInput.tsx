import { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "react-query";
import { QuillNode } from "../../types/postContextType";
import { tripPostContentState } from "../../recoil/post/postState";
import { uploadImage } from "../../api/post";

// ⭐️❌ - 글이 작성되기 전 이미지 업로드가 안되고 있음 체크 필요
function TextImageInput() {
  const quillRef = useRef<ReactQuill | null>(null);
  const [quillText, setQuillText] = useState<string>("");
  const [quillContent, setQuillContent] = useRecoilState(tripPostContentState);

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
      console.log(`되돌아온값`, imageUrl);

      const quill = quillRef.current?.getEditor();
      const range = quill?.getSelection();
      if (quill && range) {
        quill.insertEmbed(range.index, "image", imageUrl);
      }
      // console.log(quill);
    } catch (error) {
      console.log(error);
    }
  };

  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ["link", "image"]],
  };

  const handleQuillChange = (value: string) => {
    setQuillText(value);
    setQuillContent(value);
  };

  console.log(`quill contents 출력해줘`, quillContent);

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
