import { useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "react-query";
import styled from "styled-components";
import {
  contentsImagesState,
  // imageUrlsState,
  tripPostContentState,
} from "../../recoil/post/postCreateState";
import { uploadImage } from "../../api/post";
import { PostGetState } from "../../recoil/post/postGetState";
import postIsEditingState from "../../recoil/post/postIsEditingState";
import extractImageUrls from "./extractImageUrls";

interface UploadResponse {
  data: string;
  success: boolean;
  message: string;
}

const StyledReactQuill = styled(ReactQuill)`
  width: 100%;
  height: 400px;
`;

const Container = styled.div`
  width: 100%;
  margin-bottom: 100px;
`;

function TextImageInput() {
  const quillRef = useRef<ReactQuill | null>(null);

  // 글 수정 - 서버에서 가져온 PostState에서 content와 imageUrls 값을 추출
  const getPostData = useRecoilValue(PostGetState);
  const { content } = getPostData || {};

  // 수정 중인지 아닌지에 대한 값 true, false
  const postIsEditing = useRecoilValue(postIsEditingState);

  // 텍스트 및 이미지url : 작성자가 작성한 contents 관리 state
  const [quillContent, setQuillContent] = useRecoilState(tripPostContentState);
  const [, setContentsImages] = useRecoilState(contentsImagesState);

  // 이미지를 업로드 했을 때 서버에서 전달받은 이미지 urls 관리 state
  // const [returnImageUrls, setReturnImageUrls] = useRecoilState(imageUrlsState);

  // 서버에 이미지 업로드 mutation
  const uploadImageMutation = useMutation<UploadResponse, Error, FormData>(
    uploadImage,
    {
      mutationKey: "uploadImage",
    }
  );

  // 파일 업로드 후 에디터 삽입 로직
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const imageUrl = (await uploadImageMutation.mutateAsync(formData)).data;
      // 서버에서 전달받은 이미지 urls 업데이트
      // --- setReturnImageUrls((prevUrls) => [...prevUrls, imageUrl]);
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

  // Quill editor 에서 사용 가능한 툴바 설정
  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ["link"]],
  };

  // Quill editor의 내용이 변경될때 업데이트 되는 함수 state
  const handleQuillChange = (value: string) => {
    setQuillContent(value);
  };

  useEffect(() => {
    if (quillRef.current && postIsEditing) {
      const quill = quillRef.current.getEditor();
      quill.setContents(quill.clipboard.convert(content || ""));
    }
  }, [postIsEditing, content]);

  useEffect(() => {
    if (quillContent) {
      const extractedImageUrls = extractImageUrls(quillContent);
      setContentsImages(extractedImageUrls);
    }
  }, [quillContent]);

  return (
    <Container>
      <input type="file" onChange={handleFileChange} />
      <StyledReactQuill
        ref={quillRef}
        theme="snow"
        value={quillContent}
        modules={modules}
        preserveWhitespace={false}
        onChange={handleQuillChange}
      />
    </Container>
  );
}

export default TextImageInput;
