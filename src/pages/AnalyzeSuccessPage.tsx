import ReportSuccessImage from '@/assets/ReportSuccessImage.svg?react';
import BottomButtonPanel from '@/components/BottomButtonPanel';
import Button from '@/components/Button';
import PageTitle from '@/components/PageTitle';
import { buttonTypeKeys } from '@/constants/common';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useNavigate } from 'react-router-dom';
import { useRequestReport } from '@/hooks/api/useAPIs';

const AnalyzeSuccessPage = () => {
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const { mutate: requestReport } = useRequestReport({
    onSuccess: (data) => {
      navigate(`/report/${data.id}`);
    },
    onError: () => {
      alert('리포트 요청에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleReportClick = () => {
    requestReport(userInfo);
  };

  return (
    <>
      <div className="w-full h-screen overflow-y-hidden bg-background-card absolute inset-0 flex flex-col items-center">
        <header className="w-full flex px-5">
          <PageTitle onGoBack={() => {}} />
        </header>

        <section className="flex flex-col text-center items-center">
          <h1 className="text-[#222222] text-[28px] font-semibold font-['Pretendard'] leading-[39.20px] mt-6 mb-3">
            {`${userInfo.name}님의 역량 리포트가`}
            <br />
            도착했어요!
          </h1>

          <p className="subtle2-regular text-center text-text-secondary mb-[35px] max-w-[310px] break-keep">
            희망 직군의 트렌드 역량과
            <br />
            내가 가진 역량을 확인해 보아요!
          </p>
          <div className="w-full items-center">
            <ReportSuccessImage />
          </div>
          <div className="h-10 px-4 py-2 bg-white rounded-[20px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.12)] border border-[#e5eafb] justify-center items-center gap-1 inline-flex">
            <div className="justify-start items-center gap-1 flex">
              <div className="text-[#5f5f5f] text-base font-medium font-['Pretendard'] leading-normal">
                직무적합도
              </div>
              <div className="text-[#222222] text-base font-medium font-['Pretendard'] leading-normal">
                ??%
              </div>
            </div>
          </div>
        </section>

        <BottomButtonPanel>
          <Button
            type={buttonTypeKeys.ACTIVE}
            title="리포트 확인하기"
            onClick={handleReportClick}
          />
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default AnalyzeSuccessPage;
