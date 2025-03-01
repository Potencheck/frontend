import BottomButtonPanel from '@/components/BottomButtonPanel';
import Button from '@/components/Button';
import ActivityForm from '@/components/CheckExp/ActivityForm';
import CategoryCard from '@/components/CheckExp/CategoryCard';
import ExperienceForm from '@/components/CheckExp/ExperienceForm';
import Modal from '@/components/CheckExp/Modal';
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
  const [isModal, setIsModal] = useState(false);
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

  const handleEditItem = (type: ViewType, id: string) => {
    setEditItemId(id);
    setCurrentView(type);
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
          {isModal && (
            <Modal
              isOpen={isModal}
              onClose={() => setIsModal(false)}
              onPrimaryAction={() => navigate('/')}
              title="직무 경험 추출을 그만두시겠어요?"
              primaryActionText="그만두기"
              secondaryActionText="취소"
            >
              그만두기를 클릭하시면 추출된 내용이 모두 사라져요
            </Modal>
          )}
          <PageTitle
            onGoBack={() => setIsModal(true)}
            title="직무 경험 입력"
            subTitle="경험을 많이 추가할수록 정확한 결과를 받을 수 있어요"
            bgColor="background-screen"
          />
          <CategoryCard
            title="경력"
            icon="💼"
            category="experience"
            items={experience}
            onAddClick={handleAddExperience}
            onEditClick={handleEditItem}
          />

          <CategoryCard
            title="직무 활동"
            icon="📝"
            category="activity"
            items={activities}
            onAddClick={handleAddActivity}
            onEditClick={handleEditItem}
          />

          <CategoryCard
            title="자격증 및 스킬"
            icon="⚡"
            category="skill"
            items={skills}
            onAddClick={handleAddSkill}
            onEditClick={handleEditItem}
          />
        </div>

        <BottomButtonPanel>
          <Button
            type={isValid ? buttonTypeKeys.ACTIVE : buttonTypeKeys.DISABLED}
            title="완료"
            onClick={isValid ? handleNext : undefined}
          />
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default CheckExperiencePage;
