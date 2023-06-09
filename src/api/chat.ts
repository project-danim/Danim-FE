import { axiosInstance, getCookie, showError } from "./signUp";

// 채팅 시작하기 버튼 클릭시
const chatStart = async (roomId: number) => {
  try {
    const response = await axiosInstance.post(`api/chat/room/${roomId}`, null, {
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
