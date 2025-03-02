import { useState } from 'react';
import { useGetReport } from '@/hooks/api/useAPIs';
import { useUserInfo } from '@/hooks/useUserInfo';
import BottomButtonPanel from '@/components/BottomButtonPanel';
import Button from '@/components/Button';
import ReportCover from '@/components/Report/ReportCover';
import RequiredSkillsSection from '@/components/Report/RequiredSkillsSection';
import TrendSkillsSection from '@/components/Report/TrendSkillsSection';
import MyTrendSkillsSection from '@/components/Report/MyTrendSkillsSection';
import { buttonTypeKeys } from '@/constants/common';
import MyPersonalSkillsSection from '@/components/Report/MyPersonalSkillsSection';
import AIFeedbackSection from '@/components/Report/AIFeedbackSection';
import ReportReactionSection from '@/components/Report/ReportReactionSection';
import { convertToJobString, convertStringToExp } from '@/utils/experience';
import { useNavigate } from 'react-router-dom';

const ReportPage = ({ userId }: { userId: string | undefined }) => {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetReport(userId);
  const { userInfo } = useUserInfo();
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

  const userName = data?.user?.name || userInfo.name || '사용자';
  const userJob =
    data?.user?.job ||
    convertToJobString(userInfo.jobCategory, userInfo.jobPosition) ||
    '직무 미지정';
  const userExp =
    convertStringToExp(data?.user?.exp) || userInfo.exp || '경력 미지정';

  const handleButtonClick = () => {
    if (userInfo.uuid) {
      if (navigator.share) {
        navigator
          .share({
            title: `[${document.title}]`,
            text: `${userName}님이 자신의 역량 리포트를 전달했어요.\n나의 직무 역량도 확인해 보세요!\n${window.location.href}`,
          })
          .then(() => console.log('공유 성공'))
          .catch((error) => console.error('공유 실패', error));
      } else {
        alert('이 브라우저는 공유 기능을 지원하지 않습니다.');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      {isSuccess && data && (
        <>
          <ReportCover
            name={userName}
            job={userJob}
            careerFitness={data.career_fitness}
            myTrendSkills={data.my_trend_skill || []}
            trendSkills={data.trend_skill || []}
          />
          <RequiredSkillsSection
            job={userJob}
            exp={userExp}
            skills={data.trend_jd || []}
          />
          <TrendSkillsSection job={userJob} trends={data.trend_skill || []} />
          <MyTrendSkillsSection myTrends={data.my_trend_skill || []} />
          <MyPersonalSkillsSection personalSkills={data.personal_skill || []} />
          <AIFeedbackSection
            summary={data.ai_summary || ''}
            review={data.ai_review || ''}
          />

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
              title={userInfo.uuid ? '리포트 공유하기' : '역량 리포트 만들기'}
              onClick={handleButtonClick}
            />
          </BottomButtonPanel>
        </>
      )}
    </div>
  );
};

export default ReportPage;
