export interface ItemData {
  id: string | null;
  job?: string | null;
  company?: string | null;
  description?: string | null;
  name?: string | null;
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
