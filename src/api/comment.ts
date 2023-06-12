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
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getComment = async (data: any) => {
  try {
    const response = await axios.post(
      //   `${import.meta.env.VITE_APP_URL}/api/post`,
      data,
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
