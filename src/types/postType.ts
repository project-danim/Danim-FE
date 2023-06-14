export interface PostType {
  id: number;
  title: string;
  nickname: string;
  imageUrl: string;
  numberOfParticipants: number;
  groupSize: number;
  recruitmentEndDate: number;
  location: string;
  ageRange: string;
  keyword: string;
  isRecruitmentEnd: boolean;
}

export interface PostProps {
  post: PostType;
  allFilterList: any;
}
