import { useRef } from "react";
import SockJS from "sockjs-client";
import StompJs from "stompjs";

let stomp: any;

// 웹소켓 연결
const chatConnect = () => {
  // 현재의 통신 객체 ref
  const stompClientRef = useRef<any>(null);

  const sock = new SockJS(`${import.meta.env.VITE_APP_URL}/ws-stomp`);
  stomp = StompJs.over(sock);
  stomp.connect(
    {},
    () => {
      stompClientRef.current = stomp;
    },
    (err: Error) => {
      console.log("에러발생! 연결실패!", err);
    }
  );
};
export default chatConnect;
