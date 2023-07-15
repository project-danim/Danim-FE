import axios from "axios";
import Swal from "sweetalert2";
import { axiosInstance, getCookie, showError } from "./signUp";

// 채팅방 입장
export const chatStart = async (postId: number) => {
  try {
    // const response = await axiosInstance.post(`api/chat/room/${postId}`, null, {
    //   headers: {
    //     ACCESS_KEY: getCookie("accessToken"),
    //   },
    // });
    const response = await axiosInstance.post(`api/chat/room/${postId}`, null);
    return response.data;
  } catch (error: any) {
    console.log("ㅇㅇ", axiosInstance.defaults.headers);
    if (error.response.status === 401) {
      const { detail } = error.response.data;
      if (detail === "신청하신 나이대에 포함되지않습니다.") {
        // 연령대 조건이 안 맞는 경우 처리 코드
        Swal.fire({
          title: "Error",
          text: "신청하신 나이대에 포함되지 않습니다.",
          icon: "error",
          confirmButtonColor: "#A3BF3B",
        });
      } else if (detail === "신청하신 성별에 포함되지않습니다.") {
        // 성별 조건이 안 맞는 경우 처리 코드
        Swal.fire({
          title: "Error",
          text: "신청하신 성별에 포함되지 않습니다.",
          icon: "error",
          confirmButtonColor: "#A3BF3B",
        });
      } else if (detail === "이미 강퇴당한 방입니다.") {
        // 강퇴 당한 경우 처리 코드
        Swal.fire({
          title: "Error",
          text: "이미 강퇴당한 방입니다.",
          icon: "error",
          confirmButtonColor: "#A3BF3B",
        });
      } else if (detail === "모집이 완료되었습니다.") {
        // 모집 인원이 다 찬 경우 처리 코드
        Swal.fire({
          title: "Error",
          text: "모집이 완료되었습니다.",
          icon: "error",
          confirmButtonColor: "#A3BF3B",
        });
      } else {
        // 기타 401 에러 처리 코드
        Swal.fire({
          title: "Error",
          text: "권한이 없는 사용자입니다.",
          icon: "error",
          confirmButtonColor: "#A3BF3B",
        });
      }
    } else if (error.response.status === 403) {
      // 로그인이 필요한 경우 처리 코드
      Swal.fire({
        title: "Error",
        text: "로그인이 필요합니다.",
        icon: "error",
        confirmButtonColor: "#A3BF3B",
      });
      // throw new Error("로그인이 필요합니다.");
      throw error;
    } else if (error.response.status === 400) {
      const { detail } = error.response.data;
      if (detail === "존재하지 않는 채팅방 입니다.") {
        // 채팅방 존재 여부 확인 처리 코드
        Swal.fire({
          title: "Error",
          text: "존재하지 않는 채팅방 입니다.",
          icon: "error",
          confirmButtonColor: "#A3BF3B",
        });
      } else if (detail === "게시글을 찾을 수 없습니다.") {
        Swal.fire({
          title: "Error",
          text: "게시글을 찾을 수 없습니다.",
          icon: "error",
          confirmButtonColor: "#A3BF3B",
        });
        // 게시글 존재 여부 확인 처리 코드
      } else {
        // 기타 400 에러 처리 코드
        Swal.fire({
          title: "Error",
          text: "잘못된 요청입니다.",
          icon: "error",
          confirmButtonColor: "#A3BF3B",
        });
      }
    } else {
      // 기타 에러 처리 코드
      showError(error);
      Swal.fire({
        title: "Error",
        text: "신청이 처리되지 않았습니다. 같은 에러가 반복되면 관리자에게 문의 부탁드립니다.",
        icon: "error",
        confirmButtonColor: "#A3BF3B",
      });
    }
    throw error;
  }
};

// 내가 작성한 게시물 채팅방 리스트 조회
export const getMyPostChatRoomList = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/api/chat/myChatRoom`,
      {
        headers: {
          ACCESS_KEY: getCookie("accessToken"),
        },
        withCredentials: true,
      }
    );
    return response.data;
    // if (response.status === 200) {
    //   console.log(`댓글 조회에 성공하였습니다`);
    // }
    // return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 내가 참여한 게시물 채팅방 리스트 조회
export const getMyjoinChatRoomList = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/api/chat/joinChatRoom`,
      {
        headers: {
          ACCESS_KEY: getCookie("accessToken"),
        },
        withCredentials: true,
      }
    );
    return response.data;
    // if (response.status === 200) {
    //   console.log(`댓글 조회에 성공하였습니다`);
    // }
    // return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 취소하기 버튼
export const cancelApply = async (chatRoomId: any) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_URL}/api/chat/room/${chatRoomId}`,
      {
        headers: {
          ACCESS_KEY: getCookie("accessToken"),
        },
        withCredentials: true,
      }
    );
    return response.data;
    // if (response.status === 200) {
    //   console.log(`댓글 조회에 성공하였습니다`);
    // }
    // return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
