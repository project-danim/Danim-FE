import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type QuillNode = {
  // QuillNode 타입을 정의합니다.
  type: string;
  text?: string;
  level?: number;
  src?: string;
  alt?: string;
};

function TextImageInput() {
  const [quillText, setQuillText] = useState<string>("");

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
            alt: imgNode.getAttribute("alt") || "",
          });
        } else if (node.firstChild && node.firstChild.nodeName === "BR") {
          result.push({ type: "enter", text: "/n" });
        } else {
          result.push({ type: "paragraph", text: node.textContent || "" });
        }
      } else if (node.nodeName === "H1") {
        result.push({ type: "heading", level: 1, text: node.textContent || "" });
      } else if (node.nodeName === "H2") {
        result.push({ type: "heading", level: 2, text: node.textContent || "" });
      }
    });

    // console.log(result);

    setQuillText(value);
  };

  // console.log(`quill 텍스트 출력해줘`, quillText);

  return (
    <div>
      <ReactQuill theme="snow" value={quillText} modules={modules} onChange={handleQuillChange} />
    </div>
  );
}

export default TextImageInput;
