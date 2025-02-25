import CloudSVG from '@/assets/Cloud.svg?react';
import POTENCHECK from '@/assets/POTENCHECK.svg?react';
import BottomButtonPanel from '@/components/BottomButtonPanel';
import Button from '@/components/Button';
import { buttonTypeKeys } from '@/constants/common';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-screen bg-background-screen absolute inset-0 flex items-center justify-center">
        <div className="flex justify-center items-center">
          <CloudSVG />
          <div className="absolute">
            <POTENCHECK />
          </div>
        </div>
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
