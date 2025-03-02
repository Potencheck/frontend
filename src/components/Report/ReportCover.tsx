import { useNavigate } from 'react-router-dom';
import BackIcon from '@/assets/icons/Icon_Back.svg?react';
import HighMatchImage from '@/assets/icons/career-match-high.svg?react';
import MediumMatchImage from '@/assets/icons/career-match-medium.svg?react';
import LowMatchImage from '@/assets/icons/career-match-low.svg?react';
import { convertFromJobString } from '@/utils/experience';

type ReportCoverProps = {
  name: string;
  job: string;
  careerFitness: number;
  myTrendSkills?: string[];
  trendSkills?: string[];
};

const ReportCover = ({
  name,
  job,
  careerFitness,
  myTrendSkills = [],
}: ReportCoverProps) => {
  const navigate = useNavigate();

  const imageSrc = () => {
    const matchCount = myTrendSkills.length;
    const imageStyle = {
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
    };

    if (matchCount >= 4) {
      return (
        <HighMatchImage
          style={imageStyle}
          preserveAspectRatio="xMidYMid meet"
        />
      );
    } else if (matchCount >= 1) {
      return (
        <MediumMatchImage
          style={imageStyle}
          preserveAspectRatio="xMidYMid meet"
        />
      );
    } else {
      return (
        <LowMatchImage style={imageStyle} preserveAspectRatio="xMidYMid meet" />
      );
    }
  };

  return (
    <>
      <header className="w-full py-3 sticky top-0 z-20">
        <div className="w-5 h-5 mx-5" onClick={() => navigate('/onboard')}>
          <BackIcon />
        </div>
      </header>
      <section className="pt-5 pb-6 flex flex-col gap-3 items-center text-center max-w-[283px] mx-auto">
        <h1 className="head-h1 break-keep">
          {myTrendSkills.length >= 4
            ? '떼려야 뗄 수 없는 천생연분 ❤️‍🔥'
            : myTrendSkills.length >= 1
            ? '밀당하고 있는 우리 사이 👉👈'
            : '서로 알아가고 있는 단계 🌱'}
        </h1>
        <p className="subtle2-regular text-text-secondary break-keep">
          {`${name}님은 현재 ${
            convertFromJobString(job).jobPosition
          }가 요구하는 역량의 ${careerFitness}% 이상 갖추고 있어요!`}
        </p>
      </section>
      <section className="relative w-[277px] h-[328px] mx-auto mb-[68px] flex flex-col justify-end items-center gap-[10px] border-4 border-white rounded-[16px] shadow-[0px_0px_16px_rgba(0,0,0,0.12)] bg-white">
        <div className="absolute w-[140px] h-[40px] left-[68.5px] bottom-[17px] flex flex-row justify-center items-center p-[8px_16px] gap-[4px] bg-white border border-[#E5EAFB] rounded-[20px] shadow-[0px_0px_16px_rgba(0,0,0,0.12)] box-border z-0">
          <div className="flex flex-row items-center p-0 w-[108px] h-[24px] flex-none order-0">
            <span className="w-[70px] h-[24px] font-[Pretendard] font-medium text-base leading-[150%] text-[#5F5F5F] flex-none order-0">
              직무적합도{' '}
            </span>
            <span className="w-[38px] h-[24px] font-[Pretendard] font-medium text-base leading-[150%] text-[#222222] flex-none order-1">
              {careerFitness}%
            </span>
          </div>
        </div>
        <div className=" bg-white">{imageSrc()}</div>
      </section>
    </>
  );
};

export default ReportCover;
