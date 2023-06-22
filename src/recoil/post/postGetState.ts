import { atom } from "recoil";

interface PostData {
  postId?: number;
  postTitle?: string;
  recruitmentStartDate?: string;
  recruitmentEndDate?: any;
  ageRange?: string[];
  chatRoomId?: number;
  content?: string;
  nickName?: string;
  createdAt?: string[];
  gender?: string[];
  groupSize?: number;
  location?: string;
  map?: string;
  isComplete?: boolean;
  numberOfParticipants?: number;
  modifiedAt?: string[];
  participants?: number[];
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
