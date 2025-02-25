import { createContext, FC, ReactNode, useContext, useState } from 'react';

export enum JobCategory {
  DEVELOPER = '개발',
  DESIGNER = '디자이너',
  MARKETER = '기획',
}

export enum JobPosition {
  FRONTEND = '프론트엔드',
  BACKEND = '백엔드',
  FULLSTACK = '풀스택',
  // TODO: 직무 채워넣기
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
interface UserInfo {
  name: string;
  jobCategory: JobCategory | null;
  jobPosition: JobPosition | null;
  experience: Experience | null;
}

// 초기 상태
const initialUserInfo: UserInfo = {
  name: '',
  jobCategory: null,
  jobPosition: null,
  experience: null,
};

// Context 생성
interface UserInfoContextType {
  userInfo: UserInfo;
  updateUserInfo: <K extends keyof UserInfo>(
    field: K,
    value: UserInfo[K],
  ) => void;
  resetUserInfo: () => void;
}

const UserInfoContext = createContext<UserInfoContextType>({
  userInfo: initialUserInfo,
  updateUserInfo: () => {},
  resetUserInfo: () => {},
});

// Provider 컴포넌트
export const UserInfoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);

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
      value={{ userInfo, updateUserInfo, resetUserInfo }}
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
