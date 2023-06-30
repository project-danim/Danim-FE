import { useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "react-query";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  contentsImagesState,
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
  @media (max-width: 375px) {
    margin-bottom: 50px;
  }
`;

const UploadImageButton = styled.button`
  margin-top: 65px;
  width: 100%;
  background-color: var(--button-4-default-color);
  color: white;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  padding: 10px 12px;
  height: 42px;
  cursor: pointer;
  &:hover {
    border: 1px solid var(--button-4-hover-color);
    background-color: var(--button-4-hover-color);
    color: white;
  }
  &:active {
    border: 1px solid var(--button-4-pressed-outline-color);
    background-color: var(--button-4-hover-color);
    color: white;
  }
  @media (max-width: 375px) {
    margin-top: 80px;
  }
`;

function TextImageInput() {
  const quillRef = useRef<ReactQuill | null>(null);
  // 파일 입력 요소에 대한 참조 생성
  const inputFileRef = useRef<HTMLInputElement | null>(null);

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

    if (!file) return;

    // 사진 크기 제한 (10mb)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      Swal.fire({
        title: "Error",
        text: "10MB 이하의 사진만 첨부 가능합니다.",
        icon: "error",
        confirmButtonColor: "#A3BF3B",
      });
      // 에러 처리 로직 추가
      return;
    }

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
      // (error);
    }
  };

  // Quill editor 에서 사용 가능한 툴바 설정
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
    ],
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

  // UploadImageButton 클릭 이벤트 핸들러
  const handleUploadButtonClick = () => {
    inputFileRef.current?.click(); // 파일 입력 요소 클릭 이벤트 트리거
  };

  return (
    <Container>
      <input
        type="file"
        onChange={handleFileChange}
        ref={inputFileRef}
        style={{ display: "none" }}
      />
      <StyledReactQuill
        ref={quillRef}
        theme="snow"
        value={quillContent}
        modules={modules}
        preserveWhitespace={false}
        onChange={handleQuillChange}
      />
      <UploadImageButton onClick={handleUploadButtonClick}>
        이미지 추가
      </UploadImageButton>
    </Container>
  );
}

export default TextImageInput;
