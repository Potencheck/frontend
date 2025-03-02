import { convertFromJobString } from '@/utils/experience';
import PageTitle from '../PageTitle';

interface RequiredSkillsSectionProps {
  job: string;
  exp: string;
  skills: {
    name: string;
    keyword: number;
  }[];
}

const RequiredSkillsSection: React.FC<RequiredSkillsSectionProps> = ({
  job,
  exp,
  skills,
}) => {
  return (
    <>
      <section className="pl-5 pr-5">
        <PageTitle
          title={`요즘 ${exp} ${
            convertFromJobString(job).jobPosition
          }에게\n필요한 역량은 뭘까?`}
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
                {`${
                  convertFromJobString(job).jobPosition
                }\n트렌드 소프트 스킬 Top ${skills.length}`}
              </h2>
            </div>

            <div className="flex flex-col w-full">
              {skills.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start p-4 w-full bg-[#F7F9FC] ${
                    index === 0 ? 'rounded-t-xl' : ''
                  } ${index === skills.length - 1 ? 'rounded-b-xl' : ''} ${
                    index > 0 ? 'border-t border-[#E5EAFB]' : ''
                  }`}
                >
                  <div className="flex flex-row items-center gap-4">
                    <span className="w-5 h-5">
                      {index === 0
                        ? '1️⃣'
                        : index === 1
                        ? '2️⃣'
                        : index === 2
                        ? '3️⃣'
                        : index === 3
                        ? '4️⃣'
                        : '5️⃣'}
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="font-medium text-base leading-[150%] text-[#222222]">
                        {item.name}
                      </p>
                      <p className="font-normal text-sm leading-[150%] text-[#5F5F5F]">
                        중요도 {item.keyword}%
                      </p>
                    </div>
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
