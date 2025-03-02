import PageTitle from '../PageTitle';

const MyPersonalSkillsSection = () => {
  return (
    <section className="px-5 mb-[60px] flex flex-col gap-2">
      <PageTitle
        isBackButtonVisible={false}
        title={`차별점이라고 할 수 있는\n나만의 퍼스널 역량은?`}
        subTitle="치열한 취업 시장에서 빛날 수 있는 민설님만의 강점을 분석했어요"
      />
      <div className="flex flex-wrap gap-2">
        <article className="flex-1 min-w-[164px] p-4 bg-white border border-[#E5EAFB] rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-center items-center w-10 h-10">
                <span className="text-[28px] leading-[140%] tracking-[-0.32px]">
                  🪄
                </span>
              </div>
              <h3 className="font-semibold text-lg leading-[140%] text-[#222222]">
                인터랙션 활용 능력
              </h3>
            </div>
            <p className="text-sm leading-[150%] text-[#5F5F5F]">
              캐치테이블 Product Designer 경험으로 추출한 역량
            </p>
          </div>
        </article>

        <article className="flex-1 min-w-[164px] p-4 bg-white border border-[#E5EAFB] rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-center items-center w-10 h-10">
                <span className="text-[28px] leading-[140%] tracking-[-0.32px]">
                  ⭐
                </span>
              </div>
              <h3 className="font-semibold text-lg leading-[140%] text-[#222222]">
                다른 직군과의 소통 능력
              </h3>
            </div>
            <p className="text-sm leading-[150%] text-[#5F5F5F]">
              토스증권 interaction Design 경험으로 추출한 역량
            </p>
          </div>
        </article>
      </div>

      <div className="flex flex-wrap gap-2">
        <article className="flex-1 min-w-[164px] p-4 bg-white border border-[#E5EAFB] rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-center items-center w-10 h-10">
                <span className="text-[28px] leading-[140%] tracking-[-0.32px]">
                  ✨
                </span>
              </div>
              <h3 className="font-semibold text-lg leading-[140%] text-[#222222]">
                논리적인 설득력
              </h3>
            </div>
            <p className="text-sm leading-[150%] text-[#5F5F5F]">
              IT동아리 디프만 경험으로 추출한 역량
            </p>
          </div>
        </article>

        <article className="flex-1 min-w-[164px] p-4 bg-white border border-[#E5EAFB] rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-center items-center w-10 h-10">
                <span className="text-[28px] leading-[140%] tracking-[-0.32px]">
                  ⚡
                </span>
              </div>
              <h3 className="font-semibold text-lg leading-[140%] text-[#222222]">
                서비스 출시 경험
              </h3>
            </div>
            <p className="text-sm leading-[150%] text-[#5F5F5F]">
              컴퓨터활용능력 1급 경험으로 추출한 역량
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default MyPersonalSkillsSection;
