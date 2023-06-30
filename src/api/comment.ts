import axios from "axios";
import Swal from "sweetalert2";
import { getCookie } from "./signUp";
import { UserComment } from "../types/commentType";

export const createComment = async (
  newComment: UserComment,
  postId: number
) => {
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
    if (response.status === 200) {
      console.log(`댓글 조회에 성공하였습니다`);
    }
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      const { detail } = error.response.data;
      if (detail === "이미 작성하였습니다.") {
        Swal.fire({
          title: "Error",
          text: "이미 댓글을 작성하였습니다",
          icon: "error",
          confirmButtonColor: "#A3BF3B",
        });
      } else if (detail === "여행에 참여한 사람만 작성할 수 있습니다.") {
        Swal.fire({
          title: "Error",
          text: "여행에 참여한 사람만 작성할 수 있습니다.",
          icon: "error",
          confirmButtonColor: "#A3BF3B",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "게시글 작성자는 후기를 작성할 수 없습니다.",
          icon: "error",
          confirmButtonColor: "#A3BF3B",
        });
      }
    } else if (error.response.status === 400) {
      Swal.fire({
        title: "Error",
        text: `여행이 종료되어야 작성할 수 있습니다.`,
        icon: "error",
        confirmButtonColor: "#A3BF3B",
      });
    }
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
    }
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
