import { useState } from 'react';
import BottomButtonPanel from '@/components/BottomButtonPanel';
import Button from '@/components/Button';
import ReportCover from '@/components/Report/ReportCover';
import RequiredSkillsSection from '@/components/Report/RequiredSkillsSection';
import TrendSkillsSection from '@/components/Report/TrendSkillsSection';
import MyTrendSkillsSection from '@/components/Report/MyTrendSkillsSection';
import { buttonTypeKeys } from '@/constants/common';
import MyPersonalSkillsSection from '@/components/Report/MyPersonalSkillsSection';
import AIFeedbackSection from '@/components/Report/AIFeedbackSection';
import ReportReactionSection from '../components/Report/ReportReactionSection';

const ReportPage = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastOpacity, setToastOpacity] = useState(1);
  const [selectedButton, setSelectedButton] = useState<
    'like' | 'dislike' | null
  >(null);

  const handleFeedback = (type: 'like' | 'dislike') => {
    setSelectedButton(type);
    setShowToast(true);
    setToastOpacity(1);

    const fadeOut = setInterval(() => {
      setToastOpacity((prev) => {
        if (prev <= 0) {
          clearInterval(fadeOut);
          setShowToast(false);
          return 0;
        }
        return prev - 0.05;
      });
    }, 100);

    setTimeout(() => {
      clearInterval(fadeOut);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <ReportCover
        title="프로덕트 디자이너와 나의 관계는 떼려야 뗄 수 없는 천생연분 ❤️‍🔥"
        description="민설님은 현재 프로덕트 디자이너가 요구하는 역량의 80% 이상 갖추고 있어요!"
        imageSrc="https://velog.velcdn.com/images/hoyeonyy/post/da9f7819-4f11-4b09-a306-83f30163aa1d/image.png"
      />
      <RequiredSkillsSection />
      <TrendSkillsSection />
      <MyTrendSkillsSection />
      <MyPersonalSkillsSection />
      <AIFeedbackSection />

      <div className="flex flex-col items-start px-5 gap-4 pb-[96px]">
        <div className="flex flex-col items-center w-full py-8 gap-4 border-t border-[#E1E3E9]">
          <h3 className="font-medium text-base leading-[150%] text-[#222222] text-center">
            제공받은 리포트 결과는 어떤가요?
          </h3>
          <ReportReactionSection
            handleFeedback={handleFeedback}
            selectedButton={selectedButton}
          />
        </div>
      </div>

      {showToast && (
        <div
          className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg transition-opacity duration-300 ease-out`}
          style={{ opacity: toastOpacity }}
        >
          피드백을 보냈어요!
        </div>
      )}

      <BottomButtonPanel>
        <Button
          type={buttonTypeKeys.ACTIVE}
          title="리포트 공유하기"
          onClick={() => {}}
        />
      </BottomButtonPanel>
    </div>
  );
};

export default ReportPage;
