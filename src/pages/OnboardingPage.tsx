import ExperienceStep from '@/components/Onboard/ExperienceStep';
import JobStep from '@/components/Onboard/JobStep';
import LinkStep from '@/components/Onboard/LinkStep';
import NameStep from '@/components/Onboard/NameStep';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckExperiencePage from '@/pages/CheckExperiencePage';
import { ResumeProvider } from '@/hooks/useExperience';
import LoadingScreen from '@/components/Onboard/LoadingScreen';
import animationData from '@/assets/loading_paper.json';

const enum FunnelStep {
  NAME = 1,
  JOB = 2,
  EXPERIENCE = 3,
  LINK = 4,
  LOAD = 5,
  CHECK = 6,
}
const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FunnelStep>(FunnelStep.NAME);
  const { userInfo, analyzeUserResume } = useUserInfo();
  const handleOnGoBack = () => {
    if (currentStep === FunnelStep.NAME) navigate('/');
    else setCurrentStep(currentStep - 1);
  };
  // 다음 단계로 이동하는 함수 - 특정 단계를 지정할 수 있음
  const handleOnNext = (nextStep?: FunnelStep) => {
    if (nextStep) {
      // 명시적으로 다음 단계가 지정된 경우
      setCurrentStep(nextStep);
    } else {
      // 기본 다음 단계로 이동
      if (currentStep === FunnelStep.LINK) {
        analyzeUserResume();
      }
      setCurrentStep(currentStep + 1);
    }
  };
  const renderStep = () => {
    switch (currentStep) {
      case FunnelStep.NAME:
        return <NameStep onBack={handleOnGoBack} onNext={handleOnNext} />;
      case FunnelStep.JOB:
        return <JobStep onBack={handleOnGoBack} onNext={handleOnNext} />;
      case FunnelStep.EXPERIENCE:
        return (
          <ExperienceStep
            onBack={handleOnGoBack}
            onNext={(option) => {
              // 선택한 옵션에 따라 다른 단계로 이동
              if (option === 'file/link') {
                handleOnNext(FunnelStep.LINK);
              } else {
                // 다른 옵션 선택 시
                handleOnNext(FunnelStep.CHECK);
              }
            }}
          />
        );
      case FunnelStep.LINK:
        return <LinkStep onBack={handleOnGoBack} onNext={handleOnNext} />;
      case FunnelStep.LOAD:
        return (
          <LoadingScreen
            title={`${userInfo.name}님의 직무 경험을\n추출하고 있어요!`}
            subtitle={`직무 역량을 분석하기 위한\n경력, 직무 활동, 자격증 및 스킬을 추출하고 있어요`}
            onLoadingComplete={handleOnNext}
            animationData={animationData}
            isAnalyze
          />
        );
      case FunnelStep.CHECK:
        return (
          <ResumeProvider>
            <CheckExperiencePage />
          </ResumeProvider>
        );
      default:
        return <NameStep onBack={handleOnGoBack} onNext={handleOnNext} />;
    }
  };
  return <div className="w-full px-5 inset-0">{renderStep()}</div>;
};

export default OnboardingPage;
