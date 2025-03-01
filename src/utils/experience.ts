import { JobCategory, UserInfo } from '@/hooks/useUserInfo';
import { RequestReportPost } from '@/types/experience';

function convertToJobString(
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
function convertExpToString(exp: string | null): string {
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
