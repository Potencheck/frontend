import PageTitle from '../PageTitle';

interface PersonalSkill {
  skill: string;
  description: string;
}

interface MyPersonalSkillsSectionProps {
  personalSkills: PersonalSkill[];
}

const MyPersonalSkillsSection = ({
  personalSkills,
}: MyPersonalSkillsSectionProps) => {
  return (
    <section className="px-5 mb-[60px] flex flex-col gap-2">
      <PageTitle
        isBackButtonVisible={false}
        title={`차별점이라고 할 수 있는\n나만의 퍼스널 역량은?`}
        subTitle="치열한 취업 시장에서 빛날 수 있는 민설님만의 강점을 분석했어요"
      />
      <div className="flex flex-wrap gap-2">
        {personalSkills.map((skill, index) => (
          <article
            key={index}
            className="flex-1 min-w-[164px] p-4 bg-white border border-[#E5EAFB] rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.06)]"
          >
            <div className="flex flex-col gap-6">
              <div className="flex justify-center items-center w-10 h-10">
                <span className="text-[28px] leading-[140%] tracking-[-0.32px]">
                  {index === 0
                    ? '🪄'
                    : index === 1
                    ? '⭐'
                    : index === 2
                    ? '✨'
                    : '⚡'}
                </span>
              </div>
              <h3 className="font-semibold text-lg leading-[140%] text-[#222222] break-keep">
                {skill.skill}
              </h3>
              <p className="text-sm leading-[150%] text-[#5F5F5F] break-keep">
                {skill.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MyPersonalSkillsSection;
