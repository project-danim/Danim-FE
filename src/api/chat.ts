import { axiosInstance, getCookie, showError } from "./signUp";

// 채팅방 입장
const chatStart = async (postId: number) => {
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

export default chatStart;
