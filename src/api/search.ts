import SearchKeyword from "../types/searchType";
import { axiosInstance } from "./signUp";

interface FetchSearchParams {
  allKeyword: SearchKeyword;
  page: number;
  size: number;
}

// 메인 페이지 검색
export const fetchSearch = async ({
  allKeyword,
  page,
  size,
}: FetchSearchParams) => {
  try {
    const response = await axiosInstance.post(
      "api/posts/search",
      { ...allKeyword },
      {
        params: {
          page,
          size,
        },
      }
    );
    console.log("받아온 값", response.data);
    return response.data;
  } catch (err: any) {
    const errMessage = err || err.response.data.detail;
    return errMessage;
  }
};

// 메인 페이지 전체글 조회
export const fetchAllPosts = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  try {
    const response = await axiosInstance.get(
      `/api/posts/?page=${page}&size=${size}`
    );
    return response.data;
  } catch (err: any) {
    const errMessage = err.response.data.detail;
    return errMessage;
  }
};
