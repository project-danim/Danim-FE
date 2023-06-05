import { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillNode } from "../../types/postContextType";
import { tripPostContentState } from "../../recoil/post/postState";
import { uploadImage } from "../../api/post";

function TextImageInput() {
  const quillRef = useRef<ReactQuill | null>(null);
  const [quillText, setQuillText] = useState<string>("");
  const [quillContent, setQuillContent] = useRecoilState(tripPostContentState);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", async (ev: ProgressEvent<FileReader>) => {
      if (!ev.target?.result) return;
      const base64Image = ev.target.result as string;
      const imageUrl = await uploadImage(base64Image);

      const quill = quillRef.current?.getEditor();
      const range = quill?.getSelection();
      if (quill && range) {
        quill.insertEmbed(range.index, "image", imageUrl);
      }
    });
    reader.readAsDataURL(file);
  };

  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ["link", "image"]],
  };

  const handleQuillChange = (value: string) => {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(value, "text/html");
    const result: QuillNode[] = [];

    Array.from(parsed.body.childNodes).forEach((node) => {
      if (node.nodeName === "P") {
        if (node.firstChild && node.firstChild.nodeName === "IMG") {
          const imgNode = node.firstChild as HTMLImageElement;
          result.push({
            type: "image",
            src: imgNode.getAttribute("src") || "",
          });
        } else if (node.firstChild && node.firstChild.nodeName === "BR") {
          result.push({ type: "enter", text: "/n" });
        } else {
          result.push({ type: "paragraph", text: node.textContent || "" });
        }
      } else if (node.nodeName === "H1") {
        result.push({
          type: "heading",
          level: 1,
          text: node.textContent || "",
        });
      } else if (node.nodeName === "H2") {
        result.push({
          type: "heading",
          level: 2,
          text: node.textContent || "",
        });
      }
    });

    console.log(`아아아아`, result);
    setQuillContent(result);
    setQuillText(value);
  };

  console.log(`quill 텍스트 출력해줘`, quillText);

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
