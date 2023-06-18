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
  createdAt?: string[];
  gender?: string[];
  groupSize?: number;
  keyword?: string;
  location?: string;
  map?: string;
  numberOfParticipants?: number;
  modifiedAt?: string[];
  participants?: string[];
  tripEndDate?: string;
  tripStartDate?: string;
  contentsImages?: string;
  myPageImageUrl?: string;
}

export const PostGetState = atom<PostData | null>({
  key: "PostGetState",
  default: null,
});

export const postIdState = atom({
  key: "postIdState",
  default: 0,
});
