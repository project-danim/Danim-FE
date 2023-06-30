import axios from "axios";
import Swal from "sweetalert2";
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
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      const { detail } = error.response.data;

      if (detail === "title") {
        throw new Error("필수항목에는 빈값을 등록할 수 없습니다: 제목");
      } else if (detail === "groupSize") {
        throw new Error("필수항목에는 빈값을 등록할 수 없습니다: 그룹사이즈");
      } else if (detail === "ageRange") {
        throw new Error("필수항목에는 빈값을 등록할 수 없습니다: 연령대");
      } else if (detail === "gender") {
        throw new Error("필수항목에는 빈값을 등록할 수 없습니다: 성별");
      } else if (detail === "location") {
        throw new Error("필수항목에는 빈값을 등록할 수 없습니다: 장소");
      }
    }

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
    if (response.status === 200) {
      console.log(`이미지 업로드에 성공하였습니다`);
    }
    return response.data;
  } catch (error: any) {
    console.log("에러 발생:", error);
    if (error.response.status === 400) {
      Swal.fire({
        title: "Error",
        text: `jpg, jpeg, png, gif의 형식만 업로드 가능합니다.`,
        icon: "error",
        confirmButtonColor: "#A3BF3B",
      });
    }
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
  } catch (error: any) {
    if (error.response.status === 404) {
      Swal.fire({
        title: "Error",
        text: `게시글을 찾을 수 없습니다.`,
        icon: "error",
        confirmButtonColor: "#A3BF3B",
      });
    }
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
    Swal.fire({
      title: "Success",
      text: "게시글 수정이 완료되었습니다.",
      icon: "success",
      confirmButtonColor: "#A3BF3B",
    });
    return response.data;
  } catch (error: any) {
    if (error.response.status === 404) {
      Swal.fire({
        title: "Error",
        text: `게시글을 찾을 수 없습니다.`,
        icon: "error",
        confirmButtonColor: "#A3BF3B",
      });
    } else if (error.response.status === 401) {
      Swal.fire({
        title: "Error",
        text: `글 작성자만 수정할 수 있습니다`,
        icon: "error",
        confirmButtonColor: "#A3BF3B",
      });
    }
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
    Swal.fire({
      title: "Error",
      text: "게시글이 삭제되었습니다.",
      icon: "error",
      confirmButtonColor: "#A3BF3B",
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
