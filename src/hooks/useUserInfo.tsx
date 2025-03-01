import { createContext, ReactNode, useContext, useState } from 'react';
import { usePostResume } from './api/useAPIs';
import { ResumePostResponse } from '@/types/experience';

export enum JobCategory {
  DEVELOPER = '개발',
  DESIGNER = '디자이너',
  MARKETER = '기획',
}

export interface Experience {
  // PDF 파일인 경우
  file: File | null;
  link: string;
  // 직접 작성한 경우
  content?: {
    description: string;
    years: number;
    skills: string[];
  };
}

// 사용자 정보 인터페이스 TODO: 명세서 나오면 수정
export interface UserInfo {
  name: string;
  jobCategory: JobCategory | null;
  jobPosition: string | null;
  exp: string | null; // 경력/신입 여부
  experience: Experience | null;
  uuid: string | null;
}

// 초기 상태
const initialUserInfo: UserInfo = {
  name: '',
  jobCategory: null,
  jobPosition: null,
  exp: null,
  experience: null,
  uuid: null,
};

// Context 생성
interface UserInfoContextType {
  userInfo: UserInfo;
  updateUserInfo: <K extends keyof UserInfo>(
    field: K,
    value: UserInfo[K],
  ) => void;
  resetUserInfo: () => void;
  analyzeUserResume: () => void;
  resumeAnalysisData: ResumePostResponse | null;
}

const UserInfoContext = createContext<UserInfoContextType>({
  userInfo: initialUserInfo,
  updateUserInfo: () => {},
  resetUserInfo: () => {},
  analyzeUserResume: () => {},
  resumeAnalysisData: null,
});

// Provider 컴포넌트
export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [resumeAnalysisData, setResumeAnalysisData] =
    useState<ResumePostResponse | null>(null);
  const { mutate: analyzeResume } = usePostResume({
    onSuccess: (data) => {
      console.log(data);
      setResumeAnalysisData(data);
    },
  });

  const analyzeUserResume = () => {
    if (userInfo.experience?.file) {
      analyzeResume(userInfo.experience.file);
    }
  };
  const updateUserInfo = <K extends keyof UserInfo>(
    field: K,
    value: UserInfo[K],
  ) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetUserInfo = () => {
    setUserInfo(initialUserInfo);
  };

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        updateUserInfo,
        resetUserInfo,
        analyzeUserResume,
        resumeAnalysisData,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

// Custom Hook
export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (context === undefined) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
};
