import axios from "axios";
import { getCookie } from "./signUp";

interface UploadResponse {
  data: string;
  success: boolean;
  message: string;
}

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
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 게시글 작성 - 이미지 업로드
export const uploadImage = async (
  formData: FormData
): Promise<UploadResponse> => {
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
    return response.data;
  } catch (error) {
    console.error("Failed to upload image: ", error);
    throw error;
  }
};

// 게시글 가져오기
export const getPost = async (postId: number) => {
  try {
    const response = await axios.get(
      // `${import.meta.env.VITE_APP_URL}/api/post`,
      `${import.meta.env.VITE_APP_URL}/api/post/${postId}`,
      {
        headers: {
          ACCESS_KEY: getCookie("accessToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 게시글 수정
export const editPost = async (postId: number, formData: FormData) => {
  try {
    const response = await axios.put(
      // `${import.meta.env.VITE_APP_URL}/api/post`,
      `${import.meta.env.VITE_APP_URL}/api/post/${postId}`,
      formData,
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
    throw error;
  }
};

// 게시글 삭제
export const deletePost = async (postId: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_URL}/api/post/${postId}`,
      {
        headers: {
          ACCESS_KEY: getCookie("accessToken"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
