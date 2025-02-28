import BottomButtonPanel from '@/components/BottomButtonPanel';
import Button from '@/components/Button';
import ActivityForm from '@/components/CheckExp/ActivityForm';
import CategoryCard from '@/components/CheckExp/CategoryCard';
import ExperienceForm from '@/components/CheckExp/ExperienceForm';
import SkillForm from '@/components/CheckExp/SkillForm';
import PageTitle from '@/components/PageTitle';
import { buttonTypeKeys } from '@/constants/common';
import { useResume } from '@/hooks/useExperience';
import { CategoryType, ItemData, ViewType } from '@/types/experience';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formComponents = {
  experience: ExperienceForm,
  activity: ActivityForm,
  skill: SkillForm,
};

const CheckExperiencePage = () => {
  const navigate = useNavigate();
  const { experience, activities, skills } = useResume();

  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const isValid = !experience.length && !activities.length && !skills.length;

  // 현재 편집 중인 항목 찾기
  const findEditItem = (
    category: CategoryType,
    id: string,
  ): ItemData | undefined => {
    switch (category) {
      case 'experience':
        return experience.find((item) => item.id === id);
      case 'activity':
        return activities.find((item) => item.id === id);
      case 'skill':
        return skills.find((item) => item.id === id);
    }
  };

  // 추가하기 핸들러
  const handleAddExperience = () => {
    setEditItemId(null);
    setCurrentView('experience');
  };

  const handleAddActivity = () => {
    setEditItemId(null);
    setCurrentView('activity');
  };

  const handleAddSkill = () => {
    setEditItemId(null);
    setCurrentView('skill');
  };

  // 뒤로가기 핸들러
  const handleBackToMain = () => {
    setCurrentView('main');
    setEditItemId(null);
  };

  // 다음 버튼 핸들러
  const handleNext = () => {
    console.log('다음 단계로 진행');
    // 여기에 다음 단계로 이동하는 로직 추가
  };

  // 메인 화면이 아닌 경우 해당하는 폼 컴포넌트 렌더링
  if (currentView !== 'main' && currentView in formComponents) {
    const FormComponent =
      formComponents[currentView as keyof typeof formComponents];
    const editItem = editItemId
      ? findEditItem(currentView as CategoryType, editItemId)
      : undefined;
    return <FormComponent onBack={handleBackToMain} editItem={editItem} />;
  }
  return (
    <>
      <div className="w-full h-screen bg-background-screen absolute inset-0 px-5 flex flex-col items-center">
        <div className="w-full overflow-x-scroll no-scrollbar::-webkit-scrollbar no-scrollbar [&>*:last-child]:mb-20">
          <PageTitle
            onGoBack={() => navigate(-1)}
            title="직무 경험 입력"
            subTitle="경험을 많이 추가할수록 정확한 결과를 받을 수 있어요"
          />
          <CategoryCard
            title="경력"
            icon="💼"
            items={experience}
            onAddClick={handleAddExperience}
          />

          <CategoryCard
            title="직무 활동"
            icon="📝"
            items={activities}
            onAddClick={handleAddActivity}
          />

          <CategoryCard
            title="자격증 및 스킬"
            icon="⚡"
            items={skills}
            onAddClick={handleAddSkill}
          />
        </div>

        <BottomButtonPanel>
          <Button
            type={isValid ? buttonTypeKeys.ACTIVE : buttonTypeKeys.DISABLED}
            title="다음"
            onClick={isValid ? handleNext : undefined}
          />
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default CheckExperiencePage;
