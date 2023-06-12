import { atom } from "recoil";

interface PostData {
  postId?: number;
  postTitle?: string;
  recruitmentStartDate?: string;
  recruitmentEndDate?: string;
  ageRange?: string[];
  chatRoomId?: number;
  content?: string;
  nickName?: string;
  createdAt?: number[];
  gender?: string[];
  groupSize?: number;
  keyword?: string;
  location?: string;
  map?: string;
  imageUrls?: string[];
  modifiedAt?: number[];
  tripEndDate?: string;
  tripStartDate?: string;
}

export const PostGetState = atom<PostData | null>({
  key: "PostGetState",
  default: null,
});

export const postIdState = atom({
  key: "postIdState",
  default: 0,
});
