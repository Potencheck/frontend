import { JobCategory, UserInfo } from '@/hooks/useUserInfo';
import { RequestReportPost } from '@/types/experience';

export function convertToJobString(
  jobCategory: JobCategory | null,
  jobPosition: string | null,
): string {
  if (!jobCategory || !jobPosition) return '';

  const jobMap: Record<string, Record<string, string>> = {
    [JobCategory.MARKETER]: {
      '서비스 기획자': 'planning',
      'PM·PO': 'pm-po',
    },
    [JobCategory.DESIGNER]: {
      '프로덕트 디자이너': 'product-designer',
      '콘텐츠 디자이너': 'content-designer',
      '그래픽 디자이너': 'graphic-designer',
    },
    [JobCategory.DEVELOPER]: {
      '백엔드·서버': 'backend',
      프론트엔드: 'frontend',
      데이터: 'data',
      'AI·ML': 'ai-ml',
    },
  };

  return jobMap[jobCategory]?.[jobPosition] || '';
}

/**
 * Experience를 exp 문자열로 변환하는 함수
 */
export function convertExpToString(exp: string | null): string {
  if (!exp) return '';

  // '신입'이 포함된 경우 'new' 반환
  if (exp.includes('신입')) {
    return 'new';
  }
  // '경력'이 포함된 경우 'old' 반환
  else if (exp.includes('경력')) {
    return 'old';
  }

  // 기본값
  return '';
}

/**
 * exp 문자열을 Experience로 변환하는 함수
 */
export function convertStringToExp(exp: string | undefined): string {
  if (!exp) return '';

  // 'new'인 경우 '신입' 반환
  if (exp === 'new') {
    return '신입';
  }
  // 'old'인 경우 '경력' 반환
  else if (exp === 'old') {
    return '경력';
  }

  // 기본값
  return '';
}

/**
 * UserInfo를 ConvertedUserData로 변환하는 함수
 */
export function convertUserData(userInfo: UserInfo): RequestReportPost {
  return {
    user: {
      name: userInfo.name || '',
      job: convertToJobString(userInfo.jobCategory, userInfo.jobPosition),
      exp: convertExpToString(userInfo.exp),
    },
  };
}

export function convertFromJobString(jobString: string): {
  jobCategory: JobCategory | null;
  jobPosition: string | null;
} {
  const reverseJobMap: Record<
    string,
    { category: JobCategory; position: string }
  > = {
    planning: { category: JobCategory.MARKETER, position: '서비스 기획자' },
    'pm-po': { category: JobCategory.MARKETER, position: 'PM·PO' },
    'product-designer': {
      category: JobCategory.DESIGNER,
      position: '프로덕트 디자이너',
    },
    'content-designer': {
      category: JobCategory.DESIGNER,
      position: '콘텐츠 디자이너',
    },
    'graphic-designer': {
      category: JobCategory.DESIGNER,
      position: '그래픽 디자이너',
    },
    backend: {
      category: JobCategory.DEVELOPER,
      position: '백엔드·서버 개발자',
    },
    frontend: {
      category: JobCategory.DEVELOPER,
      position: '프론트엔드 개발자',
    },
    data: { category: JobCategory.DEVELOPER, position: '데이터 엔지니어' },
    'ai-ml': { category: JobCategory.DEVELOPER, position: 'AI·ML 엔지니어' },
  };

  const result = reverseJobMap[jobString];
  if (result) {
    return { jobCategory: result.category, jobPosition: result.position };
  }

  return { jobCategory: null, jobPosition: null };
}
