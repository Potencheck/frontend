const AIFeedbackSection = () => {
  return (
    <section className="flex flex-row items-center px-5 pb-[52px] gap-[10px]">
      <div className="flex flex-row items-center gap-2 w-full drop-shadow-[0_0_12px_rgba(0,0,0,0.06)]">
        <article className="flex flex-col items-start p-5 gap-5 w-full bg-white border border-[#E5EAFB] backdrop-blur-sm rounded-2xl">
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex flex-row items-center gap-3 w-full">
              <h2 className="font-semibold text-xl leading-[140%] text-[#222222]">
                AI의 총평
              </h2>
            </div>
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="flex items-center p-3 gap-2.5 w-full bg-[#F8F9FC] rounded-lg">
                <span className="text-[22px] leading-[150%] text-[#222222]">
                  🧚
                </span>
                <p className="font-semibold text-base leading-[150%] text-[#222222]">
                  데이터로 고객 마음을 사로잡는 디자인계의 허준
                </p>
              </div>
              <p className="text-sm leading-[150%] text-[#656565]">
                프로덕트 디자이너에게 요구되는 핵심 역량을 두루 갖추고 있네요!
                특히 데이터 기반 개선 경험이 강점입니다. 이를 더욱 돋보이게
                하려면, 어떤 데이터를 활용했고, 구체적으로 어떤 문제를
                해결했으며, 개선 결과가 사용자 경험이나 비즈니스 성과에 어떤
                영향을 미쳤는지 정리해보면 더욱 효과적일 것입니다.
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default AIFeedbackSection;
