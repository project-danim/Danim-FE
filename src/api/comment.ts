import axios from "axios";
import { getCookie } from "./signUp";

export const createComment = async (newComment: Comment, postId: number) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/api/post/${postId}/review`,
      newComment,
      {
        headers: {
          ACCESS_KEY: getCookie("accessToken"),
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getComment = async (postId: number) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/api/post/${postId}/review`,
      {
        headers: {
          ACCESS_KEY: getCookie("accessToken"),
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log(`댓글 조회에 성공하였습니다`);
      return response.data.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
