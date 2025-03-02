import { useNavigate } from 'react-router-dom';
import BackIcon from '@/assets/icons/Icon_Back.svg?react';

type ReportCoverProps = {
  title: string;
  description: string;
  imageSrc: string;
};

const ReportCover = ({ title, description, imageSrc }: ReportCoverProps) => {
  const navigate = useNavigate();

  return (
    <>
      <header className="w-full py-3 sticky top-0 z-20">
        <div className="w-5 h-5 mx-5" onClick={() => navigate('/onboard')}>
          <BackIcon />
        </div>
      </header>
      <section className="pt-5 pb-6 flex flex-col gap-3 items-center text-center max-w-[283px] mx-auto">
        <h1 className="head-h1 break-keep">{title}</h1>
        <p className="subtle2-regular text-text-secondary break-keep">
          {description}
        </p>
      </section>
      <section className="relative w-[277px] h-[334px] mx-auto mb-[68px] flex flex-col justify-end items-center p-[16px_58px] gap-[10px] bg-[#FFDA7F] border-4 border-white rounded-[16px] shadow-[0px_0px_16px_rgba(0,0,0,0.12)]">
        <div className="absolute w-[140px] h-[40px] left-[68.5px] top-[277px] flex justify-center items-center p-[8px_16px] gap-[4px] bg-white border border-[#E5EAFB] rounded-[20px] shadow-[0px_0px_16px_rgba(0,0,0,0.12)] z-[1]">
          <div className="flex items-center w-[108px] h-[24px]">
            <span className="subtle2-medium text-[#5F5F5F]">직무적합도</span>
            <span className="subtle2-medium text-[#222222]">80%</span>
          </div>
        </div>
        <img
          src={imageSrc}
          alt="Cover"
          className="absolute w-[223.9px] h-[225px] left-[26.55px] top-[30px] object-cover"
        />
      </section>
    </>
  );
};

export default ReportCover;
