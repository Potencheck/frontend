import ExperienceStep from '@/components/Onboard/ExperienceStep';
import JobStep from '@/components/Onboard/JobStep';
import LinkStep from '@/components/Onboard/LinkStep';
import NameStep from '@/components/Onboard/NameStep';
import { UserInfoProvider } from '@/hooks/useUserInfo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const enum FunnelStep {
  NAME = 1,
  JOB = 2,
  EXPERIENCE = 3,
  LINK = 4,
  CHECK = 5,
}
const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<FunnelStep>(FunnelStep.NAME);
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
      if (currentStep !== FunnelStep.LINK) setCurrentStep(currentStep + 1);
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
      default:
        return <NameStep onBack={handleOnGoBack} onNext={handleOnNext} />;
    }
  };
  return (
    <div className="w-full px-5 inset-0">
      <UserInfoProvider>{renderStep()}</UserInfoProvider>
    </div>
  );
};

export default OnboardingPage;
