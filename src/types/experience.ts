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
