import { createContext, useContext, useState, ReactNode } from 'react';
import { ItemData, CategoryType } from '@/types/experience';
import { useUserInfo } from './useUserInfo';
import { useRequestReport } from './api/useAPIs';
import { useNavigate } from 'react-router-dom';

type ResumeContextType = {
  experience: ItemData[];
  activities: ItemData[];
  skills: ItemData[];
  addItem: (category: CategoryType, item: ItemData) => void;
  updateItem: (category: CategoryType, id: string, item: ItemData) => void;
  deleteItem: (category: CategoryType, id: string) => void;
  requestUserReport: () => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { userInfo, updateUserInfo, resumeAnalysisData } = useUserInfo();
  const { mutate: requestReport } = useRequestReport({
    onSuccess: (data) => {
      updateUserInfo('uuid', data.id);
    },
    onError: () => {
      alert('리포트 생성에 실패했습니다. 다시 시도해주세요.');
      navigate('/');
    },
  });

  const requestUserReport = () => {
    requestReport(userInfo);
  };
  const [experience, setExperience] = useState<ItemData[]>(() => {
    if (resumeAnalysisData?.career) {
      // API 응답 구조에 맞게 데이터 변환
      return resumeAnalysisData.career.map((item: ItemData) => {
        const result: ItemData = {
          id:
            item.id ||
            `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        };

        // 각 속성이 존재하고 빈 문자열이 아닌 경우에만 할당
        if (item.job !== undefined && item.job !== '') result.job = item.job;
        if (item.company !== undefined && item.company !== '')
          result.company = item.company;
        if (item.description !== undefined && item.description !== '')
          result.description = item.description;

        return result;
      });
    }
    return [];
  });
  const [activities, setActivities] = useState<ItemData[]>(() => {
    if (resumeAnalysisData?.activities) {
      // API 응답 구조에 맞게 데이터 변환
      return resumeAnalysisData.activities.map((item: ItemData) => {
        const result: ItemData = {
          id:
            item.id ||
            `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        };
        if (item.name !== undefined && item.name !== '')
          result.name = item.name;

        return result;
      });
    }
    return [];
  });
  const [skills, setSkills] = useState<ItemData[]>(() => {
    if (
      resumeAnalysisData?.certifications &&
      Array.isArray(resumeAnalysisData.certifications)
    ) {
      return resumeAnalysisData.certifications.map((certification: string) => ({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9), // 고유 ID 생성
        name: certification, // 문자열 자체를 title 속성에 할당
      }));
    }
    return [];
  });

  const addItem = (category: CategoryType, item: ItemData) => {
    const newItem = { ...item, id: Date.now().toString() };

    switch (category) {
      case 'experience':
        setExperience((prev) => [...prev, newItem]);
        break;
      case 'activity':
        setActivities((prev) => [...prev, newItem]);
        break;
      case 'skill':
        setSkills((prev) => [...prev, newItem]);
        break;
    }
  };

  const updateItem = (category: CategoryType, id: string, item: ItemData) => {
    switch (category) {
      case 'experience':
        setExperience((prev) =>
          prev.map((i) => (i.id === id ? { ...item, id } : i)),
        );
        break;
      case 'activity':
        setActivities((prev) =>
          prev.map((i) => (i.id === id ? { ...item, id } : i)),
        );
        break;
      case 'skill':
        setSkills((prev) =>
          prev.map((i) => (i.id === id ? { ...item, id } : i)),
        );
        break;
    }
  };

  const deleteItem = (category: CategoryType, id: string) => {
    switch (category) {
      case 'experience':
        setExperience((prev) => prev.filter((i) => i.id !== id));
        break;
      case 'activity':
        setActivities((prev) => prev.filter((i) => i.id !== id));
        break;
      case 'skill':
        setSkills((prev) => prev.filter((i) => i.id !== id));
        break;
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        experience,
        activities,
        skills,
        addItem,
        updateItem,
        deleteItem,
        requestUserReport,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
