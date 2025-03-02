import React from 'react';

interface MyTrendSkillsSectionProps {
  myTrends: string[];
}

const MyTrendSkillsSection: React.FC<MyTrendSkillsSectionProps> = ({
  myTrends,
}) => {
  return (
    <section className="flex mb-[60px] flex-row items-center px-5 gap-2.5 w-full">
      <div className="flex flex-col items-start p-5 gap-5 w-full bg-white border border-[#E5EAFB] backdrop-blur-sm rounded-2xl drop-shadow-[0_0_12px_rgba(0,0,0,0.06)]">
        <h2 className="font-semibold text-xl leading-[140%] text-[#222222]">
          내가 가진 트렌드 역량
        </h2>
        <div className="flex flex-wrap gap-x-2 gap-y-3">
          {myTrends.map((trend, index) => {
            const emojis = ['⭐️', '✨', '⚡️', '🪄', '💡', '🔖', '🔗'];
            const emoji = emojis[index % emojis.length];

            return (
              <div
                key={index}
                className="flex justify-center items-center py-2 px-4 bg-[#FFF5F1] rounded-[20px]"
              >
                <span className="font-medium text-sm leading-[150%] text-[#222222]">
                  {`${emoji} ${trend}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MyTrendSkillsSection;
