import { UserInfo } from '@/hooks/useUserInfo';

export interface ItemData {
  id: string | null;
  job?: string | null;
  company?: string | null;
  description?: string | null;
  name: string | null;
  subtitle?: string | null;
}

export type CategoryType = 'experience' | 'activity' | 'skill';

export type ViewType = 'main' | CategoryType;

// 101 이력서 직무 경험 추출 response type
export type ResumePostResponse = {
  career: ItemData[] | null;
  activities: ItemData[] | null;
  certifications: string[] | null;
};

// 202 리포트 생성(파일) response type
export type RequestPostResponse = {
  id: string;
};

export type RequestReportPostUser = {
  name: string;
  job: string;
  exp: string;
};

export type RequestRepostPostCareer = {
  career: ItemData[];
  activities: ItemData[];
  certifications: string[];
};

export type RequestReportPost = {
  user_json: UserInfo;
  career_data: RequestRepostPostCareer;
};
