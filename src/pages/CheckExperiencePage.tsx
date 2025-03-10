import BottomButtonPanel from '@/components/BottomButtonPanel';
import Button from '@/components/Button';
import ActivityForm from '@/components/CheckExp/ActivityForm';
import CategoryCard from '@/components/CheckExp/CategoryCard';
import ExperienceForm from '@/components/CheckExp/ExperienceForm';
import Modal from '@/components/CheckExp/Modal';
import SkillForm from '@/components/CheckExp/SkillForm';
import LoadingScreen from '@/components/Onboard/LoadingScreen';
import PageTitle from '@/components/PageTitle';
import { buttonTypeKeys } from '@/constants/common';
import { useResume } from '@/hooks/useExperience';
import { CategoryType, ItemData, ViewType } from '@/types/experience';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import animationData from '@/assets/loading_report.json';
import { useUserInfo } from '@/hooks/useUserInfo';

const formComponents = {
  experience: ExperienceForm,
  activity: ActivityForm,
  skill: SkillForm,
};

const CheckExperiencePage = () => {
  const navigate = useNavigate();
  const { experience, activities, skills, requestUserReport } = useResume();
  const { userInfo, updateUserInfo } = useUserInfo();
  const isThereFileOrLink = !!(
    userInfo.experience?.file || userInfo.experience?.link
  );
  const [currentView, setCurrentView] = useState<ViewType>('main');
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [isModal, setIsModal] = useState(false);
  const [isCompleteModal, setIsCompleteModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isValid =
    experience.length > 0 || activities.length > 0 || skills.length > 0;
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
    requestUserReport();
    setIsLoading(true);
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
      {isLoading ? (
        <LoadingScreen
          title={`두구두구..\n희망 직무와 내 역량의 적합도는?`}
          subtitle={`최근 1개월 내 희망 직무의 채용공고에서 분석한\n핵심 트렌드 역량을 내 역량과 비교하고 있어요`}
          onLoadingComplete={() => navigate('/analyze-success')}
          animationData={animationData}
          isAnalyze
          nextRoute="/analyze-success"
        />
      ) : (
        <div className="w-full h-screen bg-background-screen absolute inset-0 px-5 flex flex-col items-center">
          <div className="w-full overflow-x-scroll no-scrollbar::-webkit-scrollbar no-scrollbar [&>*:last-child]:mb-20">
            {isModal && (
              <Modal
                isOpen={isModal}
                onClose={() => setIsModal(false)}
                onPrimaryAction={() => {
                  navigate('/');
                  updateUserInfo('experience', { file: null, link: '' });
                }}
                title={`직무 경험 ${
                  isThereFileOrLink ? '추가' : '입력'
                }을 그만두시겠어요?`}
                primaryActionText="그만두기"
                secondaryActionText="취소"
              >
                {`그만두기를 클릭하시면 ${
                  isThereFileOrLink ? '추가' : '입력'
                }된 내용이 모두 사라져요`}
              </Modal>
            )}
            {isCompleteModal && isThereFileOrLink && (
              <Modal
                isOpen={isCompleteModal}
                onClose={() => setIsCompleteModal(false)}
                onPrimaryAction={handleNext}
                title="AI가 직무 경험 추출을 끝냈어요!"
                primaryActionText="바로 분석하기"
                secondaryActionText="경험 추가하기"
              >
                더 보완하고 싶다며 경험을 추가하거나, 바로 분석을 진행할 수
                있어요!
              </Modal>
            )}
            <PageTitle
              onGoBack={() => setIsModal(true)}
              title={`직무 경험 ${isThereFileOrLink ? '추가' : '입력'}`}
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
              type={
                !isThereFileOrLink && !isValid
                  ? buttonTypeKeys.DISABLED
                  : buttonTypeKeys.ACTIVE
              }
              title="완료"
              {...(isValid || !isThereFileOrLink
                ? { onClick: handleNext }
                : {})}
            />
          </BottomButtonPanel>
        </div>
      )}
    </>
  );
};

export default CheckExperiencePage;
