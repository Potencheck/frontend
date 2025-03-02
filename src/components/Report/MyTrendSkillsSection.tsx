const MyTrendSkillsSection = () => {
  return (
    <section className="flex mb-[60px] flex-row items-center px-5 gap-2.5 w-full h-56">
      <div className="flex flex-col items-start p-5 gap-5 w-full bg-white border border-[#E5EAFB] backdrop-blur-sm rounded-2xl drop-shadow-[0_0_12px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col items-start gap-5 w-full">
          <h2 className="font-semibold text-xl leading-[140%] text-[#222222]">
            내가 가진 트렌드 역량
          </h2>
          <div className="flex flex-wrap gap-x-2 gap-y-3">
            <div className="flex justify-center items-center py-2 px-4 bg-[#FFF5F1] rounded-[20px]">
              <span className="font-medium text-sm leading-[150%] text-[#222222]">
                ⭐ 사용자 니즈 분석 능력
              </span>
            </div>
            <div className="flex justify-center items-center py-2 px-4 bg-[#FFF5F1] rounded-[20px]">
              <span className="font-medium text-sm leading-[150%] text-[#222222]">
                ✨ 논리적인 설득력
              </span>
            </div>
            <div className="flex justify-center items-center py-2 px-4 bg-[#FFF5F1] rounded-[20px]">
              <span className="font-medium text-sm leading-[150%] text-[#222222]">
                ⚡ 서비스 출시 경험
              </span>
            </div>
            <div className="flex justify-center items-center py-2 px-4 bg-[#FFF5F1] rounded-[20px]">
              <span className="font-medium text-sm leading-[150%] text-[#222222]">
                🪄 A/B 테스트 개선 경험
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyTrendSkillsSection;
