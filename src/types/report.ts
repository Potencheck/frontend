export type ReportGetResponse = {
  user: {
    name: string;
    exp: string;
    job: string;
  };
  career_fitness: number;
  trend_jd: {
    name: string;
    keyword: number;
  }[];
  trend_skill: string[];
  my_trend_skill: string[];
  personal_skill: {
    skill: string;
    description: string;
  }[];
  ai_summary: string;
  ai_review: string;
  id: string;
};
