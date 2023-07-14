import { axiosInstance, getAccessToken } from "./signUp";

// 에러 콘솔 출력 함수
export function showError(error: any) {
  console.log("여기서 error 발생", error);
}

// 유저 정보 가져오기(비동기 통신함수)
export const fecthUserInfo = async (id: string) => {
  try {
    // const accessToken = getAccessToken();
    // const response = await axiosInstance.get(`/api/user/${id}/info`, {
    // headers: {
    //       ACCESS_KEY: accessToken,
    //     },
    //   });
    const response = await axiosInstance.get(`/api/user/${id}/info`);
    return response.data.data;
  } catch (err: any) {
    console.log("ㅇㅇ", axiosInstance.defaults.headers.common);
    const errMessage = err.response.data.detail || err.message;
    return errMessage;
  }
};

// 리뷰 가져오기
export const fecthReviews = async (id: string) => {
  try {
    // const accessToken = getAccessToken();
    // const response = await axiosInstance.get(`/api/user/${id}/review`, {
    //   headers: {
    //     ACCESS_KEY: accessToken,
    //   },
    // });
    const response = await axiosInstance.get(`/api/user/${id}/review`);
    return response.data.data;
  } catch (err: any) {
    const errMessage = err.response.data.detail || err.message;
    return errMessage;
  }
};

// 게시글 가져오기
export const fecthPosts = async (id: string) => {
  try {
    // const accessToken = getAccessToken();
    // const response = await axiosInstance.get(`/api/user/${id}/posts`, {
    //   headers: {
    //     ACCESS_KEY: accessToken,
    //   },
    // });
    const response = await axiosInstance.get(`/api/user/${id}/posts`);
    return response.data.data;
  } catch (err: any) {
    const errMessage = err.response.data.detail || err.message;
    return errMessage;
  }
};

// 내 정보 수정?
export const fetchMyInfo = async (id: any, userInfo: any) => {
  try {
    const user = new FormData();
    Object.keys(userInfo).forEach((key) => user.append(key, userInfo[key]));
    const accessToken = getAccessToken();
    const response = await axiosInstance.put(`/api/user/${id}/myInfo`, user, {
      headers: {
        ACCESS_KEY: accessToken,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || error.message;
    return errorMessage;
  }
};
