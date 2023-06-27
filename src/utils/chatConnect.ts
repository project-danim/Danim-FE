// 웹소켓 연결을 위한 커스텀 훅
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import SockJS from "sockjs-client";
import StompJs from "stompjs";
import hasNewChatState from "../recoil/chat/alarm";

const useChatConnect = (userId: string) => {
  // 채팅 알람 state
  const [, setHasNewChat] = useRecoilState(hasNewChatState);

  useEffect(() => {
    const sock = new SockJS(`${import.meta.env.VITE_APP_URL}/ws-stomp`);
    const stomp = StompJs.over(sock);
    stomp.connect(
      {},
      () => {
        stomp.subscribe(`/sub/alarm/${userId}`, (data: any) => {
          // 로컬 스토리지 배열 저장은 문자열 그대로 사용
          localStorage.setItem("chatAlarms", data.body);

          // 받아온 데이터가 문자열이므로 JSON 객체로 변환
          const alarmArray = JSON.parse(data.body);

          // alarmLeng이 총 알람의 개수
          const alarmLeng = alarmArray.length;

          // 총 알람의 개수가 0이 아니면 새로운 채팅 있음
          if (alarmArray[alarmLeng - 1].sum !== 0) {
            setHasNewChat(true);
            localStorage.setItem("hasNewChat", "true");
          } else {
            setHasNewChat(false);
            localStorage.setItem("hasNewChat", "false");
          }
        });
      },
      // 에러 콜백 함수는 string 또는 Frame 타입의 파라미터를 받아야 함.
      (err: string | StompJs.Frame) => {
        console.log("에러발생! 연결실패!", err);
      }
    );
  }, []);
};
export default useChatConnect;
