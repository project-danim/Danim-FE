// 서버로 전송할 post의 게시글의 형식 변환 type
export type QuillNode = {
  type: string;
  text?: string;
  level?: number;
  src?: string;
};
