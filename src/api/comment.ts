import axios from "axios";
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
      // } else if (response.status === 208) {
      //   alert(`이미 후기를 남겼습니다. 다음 여행을 기대해 주세요!`);
    }
    return response.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      const { detail } = error.response.data;
      // alert(`여행에 참여한 사람만 작성할 수 있습니다.`);
      if (detail === "이미 작성하였습니다.") {
        alert("이미 댓글을 작성하였습니다");
      } else if (detail === "여행에 참여한 사람만 작성할 수 있습니다.") {
        alert("여행에 참여한 사람만 작성할 수 있습니다.");
      } else {
        alert("게시글 작성자는 후기를 작성할 수 없습니다.");
      }
    } else if (error.response.status === 400) {
      alert(`여행이 종료되어야 작성할 수 있습니다.`);
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
