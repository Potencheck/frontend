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
    const newUserInfo = {
      user_json: userInfo,
      career_data: {
        career: experience,
        activities: activities,
        certifications:
          skills
            .map((skill) => skill.name)
            .filter((name): name is string => name !== null) ?? [],
      },
    };
    requestReport(newUserInfo);
  };
  const [experience, setExperience] = useState<ItemData[]>(() => {
    return [];
  });
  const [activities, setActivities] = useState<ItemData[]>(() => {
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
