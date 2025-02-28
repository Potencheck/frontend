import { createContext, useContext, useState, ReactNode } from 'react';
import { ItemData, CategoryType } from '@/types/experience';

type ResumeContextType = {
  experience: ItemData[];
  activities: ItemData[];
  skills: ItemData[];
  addItem: (category: CategoryType, item: ItemData) => void;
  updateItem: (category: CategoryType, id: string, item: ItemData) => void;
  deleteItem: (category: CategoryType, id: string) => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [experience, setExperience] = useState<ItemData[]>([]);
  const [activities, setActivities] = useState<ItemData[]>([]);
  const [skills, setSkills] = useState<ItemData[]>([]);

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
