// 웹소켓 연결을 위한 커스텀 훅
import { useEffect } from "react";
import SockJS from "sockjs-client";
import StompJs from "stompjs";

const useChatConnect = (userId: string) => {
  useEffect(() => {
    const sock = new SockJS(`${import.meta.env.VITE_APP_URL}/ws-stomp`);
    const stomp = StompJs.over(sock);
    stomp.connect(
      {},
      () => {
        stomp.subscribe(`/sub/alarm/${userId}`, (data: any) => {
           console.log(data);
        });
        // console.log("구독완료");
      },
      // 에러 콜백 함수는 string 또는 Frame 타입의 파라미터를 받아야 함.
      (err: string | StompJs.Frame) => {
        console.log("에러발생! 연결실패!", err);
      }
    );
  }, []);
};
export default useChatConnect;
