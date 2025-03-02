import PageTitle from '../PageTitle';

const RequiredSkillsSection = () => {
  return (
    <>
      <section className="pl-5 pr-5">
        <PageTitle
          title={`요즘 프로덕트 디자이너에게\n필요한 역량은 뭘까?`}
          subTitle="AI가 최근 1개월 내 채용 공고를 바탕으로 중요한 직무 트렌드 역량을 알아냈어요"
          isBackButtonVisible={false}
        />
      </section>
      <section className="flex flex-row items-center px-5 gap-2.5 w-full">
        <div className="flex flex-col items-start p-4 pb-5 gap-5 w-full bg-white border border-[#E5EAFB] backdrop-blur-sm rounded-2xl drop-shadow-[0_0_12px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex items-center gap-3 w-full">
              <div className="flex justify-center items-center p-2 w-[50px] h-[50px] bg-[#F7F9FC] rounded-lg">
                <span className="w-[33.33px] h-[33px] font-semibold text-[23.33px] leading-[140%] text-center tracking-[-0.27px] text-[#0B0B0B]">
                  🔮
                </span>
              </div>
              <h2 className="flex-1 font-semibold text-lg leading-[140%] text-[#222222] whitespace-pre-line">
                {`프로덕트 디자이너\n트렌드 소프트 스킬 Top 5`}
              </h2>
            </div>

            <div className="flex flex-col w-full">
              {[
                { number: '1️⃣', skill: '논리적인 설득력', importance: '90%' },
                {
                  number: '2️⃣',
                  skill: '사용자 니즈 분석 능력',
                  importance: '84%',
                },
                {
                  number: '3️⃣',
                  skill: '서비스 출시 경험',
                  importance: '84%',
                },
                {
                  number: '4️⃣',
                  skill: 'A/B 테스트 개선 경험',
                  importance: '84%',
                },
                { number: '5️⃣', skill: '논리적인 설득력', importance: '84%' },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start p-4 w-full bg-[#F7F9FC] ${
                    index === 0 ? 'rounded-t-xl' : ''
                  } ${index === 4 ? 'rounded-b-xl' : ''} ${
                    index > 0 ? 'border-t border-[#E5EAFB]' : ''
                  }`}
                >
                  <span className="w-5 h-5">{item.number}</span>
                  <div className="ml-4">
                    <p className="font-medium text-base leading-[150%] text-[#222222]">
                      {item.skill}
                    </p>
                    <p className="font-normal text-sm leading-[150%] text-[#5F5F5F]">
                      중요도 {item.importance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RequiredSkillsSection;
