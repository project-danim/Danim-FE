import axios from "axios";
import { axiosInstance, getCookie, showError } from "./signUp";

// 채팅방 입장
export const chatStart = async (postId: number) => {
  try {
    const response = await axiosInstance.post(`api/chat/room/${postId}`, null, {
      headers: {
        ACCESS_KEY: getCookie("accessToken"),
      },
    });
    return response.data;
  } catch (err) {
    showError(err);
    throw err;
  }
};

// 내가 작성한 게시물 채팅방 리스트 조회

export const getMyPostChatRoomList = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/api/chat/myChatRoom`,
      {
        headers: {
          ACCESS_KEY: getCookie("accessToken"),
        },
        withCredentials: true,
      }
    );
    return response.data;
    // if (response.status === 200) {
    //   console.log(`댓글 조회에 성공하였습니다`);
    // }
    // return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
