import { axiosInstance, getAccessToken } from "./signUp";


// 에러 콘솔 출력 함수
export function showError(error: any) {
  console.log("여기서 error 발생", error);
}


// 유저 정보 가져오기
export const fecthUserInfo = async (id: string) => {
  try {
    const accessToken = getAccessToken();
    const response = await axiosInstance.get(`/api/user/${id}/info`, {
    headers: {
          ACCESS_KEY: accessToken,
        },
      });
    
    return response.data.data
  } catch (err: any) {
    const errMessage = err.response.data.detail || err.message;
    return errMessage;
  }
};

