import Logo from '@/assets/icons/Logo.svg?react';
import LandingImage from '@/assets/LandingImage.svg?react';
import BottomButtonPanel from '@/components/BottomButtonPanel';
import Button from '@/components/Button';
import { buttonTypeKeys } from '@/constants/common';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-screen overflow-y-hidden bg-background-card absolute inset-0 flex flex-col items-center">
        <header
          className={`w-full px-5 py-3 sticky top-0 bg-background-card z-20`}
        >
          <Logo />
        </header>
        <section className="flex flex-col text-center items-center">
          <h1 className="head-h1 mt-6 mb-3">
            희망 직무의
            <br />
            최신 트렌드 역량은 뭘까?
          </h1>

          <p className="subtle2-regular text-center text-text-secondary mb-[35px] max-w-[310px] break-keep">
            나의 직무 역량을 체크해 봐요
          </p>
          <div className="w-full items-center">
            <LandingImage />
          </div>
        </section>

        <BottomButtonPanel>
          <Button
            type={buttonTypeKeys.ACTIVE}
            title="시작하기"
            onClick={() => navigate('/onboard')}
          />
        </BottomButtonPanel>
      </div>
    </>
  );
};

export default LandingPage;
