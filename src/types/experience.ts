export interface ItemData {
  id?: string;
  title: string;
  subtitle?: string;
  period?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  months?: number;
}

export type CategoryType = 'experience' | 'activity' | 'skill';

export type ViewType = 'main' | CategoryType;

// 101 이력서 직무 경험 추출 response type
export type ResumePostResponse = {
  career: ItemData[] | null;
  activities: ItemData[] | null;
  certifications: string[] | null;
};