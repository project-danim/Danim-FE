import SockJs from "sockjs-client";
import StompJs from "stompjs";
import { useRef } from "react";

let stomp: any;

const connectSocket = () => {
  const stompClientRef = useRef<any>(null);
  const sock = new SockJs(`${import.meta.env.VITE_APP_URL}/ws-stomp`);
  stomp = StompJs.over(sock);
  stomp.connect(
    {},
    () => {
      stompClientRef.current = stomp;
      stomp.subscribe(`/sub/alarm`, (data: any) => {
        console.log(data.body);
        // const newMessage = JSON.parse(data.body);
        // setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
      //   stomp.send(
      //     "/pub/chat/message",
      //     {},
      //     JSON.stringify({
      //       type: "ENTER",
      //       roomName,
      //       sender: userId,
      //       message: "",
      //     })
      //   );
    },
    (err: any) => {
      console.log("에러발생! 연결실패!", err);
    }
  );
};

export default connectSocket;
