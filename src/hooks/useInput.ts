import { useState, useRef, ChangeEvent } from "react";

function useInput(text: string): [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  React.Dispatch<React.SetStateAction<string>>,
  // React.MutableRefObject<string>에서 RefObject로 변경해서 사용했더니 에러 잡힘
  // 값을 추적하는게 아니라 element 요소를 추적해서 focus를 잡으려고 한거라서 RefObject<HTMLInputElement>로 해야함
  React.RefObject<HTMLInputElement>
] {
  const [value, setValue] = useState<string>(text);
  const inputRef = useRef<HTMLInputElement>(null);

  const handler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, handler, setValue, inputRef];
}

export default useInput;
