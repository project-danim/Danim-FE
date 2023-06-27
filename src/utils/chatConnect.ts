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
          // 받아온 데이터가 문자열이므로 JSON 객체로 변환
          const alarmArray = JSON.parse(data.body);
          // console.log(alarmArray);
          // 받아온 배열 안의 알람 객체의 value가 0이 아닌게 있으면
          alarmArray.forEach((chatAlarm: any) => {
            const alarm = Object.values(chatAlarm);
            if (alarm[0] !== 0) {
              return setHasNewChat(() => true);
            }
            return null;
          });
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
