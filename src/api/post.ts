import axios from "axios";
import { getCookie } from "./signUp";

// 게시글 작성
export const createPost = async (data: any) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/api/post`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ACCESS_KEY: getCookie("accessToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 게시글 작성 - 이미지 업로드
export const uploadImage = async (formData: FormData): Promise<string> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/api/post/image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          // ACCESS_KEY: getCookie("accessToken"),
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to upload image: ", error);
    // throw error;
  }
};

// 게시글 삭제
export const deletePost = async (data: any) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_URL}/api/post/image`,
      data
    );
    return response.data;
  } catch (error) {
    // throw error;
    //   console.error(error);
  }
};
