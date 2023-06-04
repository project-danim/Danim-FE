import axios from "axios";

export const createPost = async (data: any) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/post`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (data: any) => {
  try {
    const response = await axios.delete("서버 주소", data);
    return response.data;
  } catch (error) {
    // throw error;
    //   console.error(error);
  }
};
