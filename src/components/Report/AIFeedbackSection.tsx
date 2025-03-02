interface AIFeedbackSectionProps {
  summary: string;
  review: string;
}

const AIFeedbackSection = ({ summary, review }: AIFeedbackSectionProps) => {
  return (
    <section className="flex flex-row items-center px-5 pb-[52px] gap-[10px]">
      <div className="flex flex-row items-center gap-2 w-full drop-shadow-[0_0_12px_rgba(0,0,0,0.06)]">
        <article className="flex flex-col items-start p-5 gap-5 w-full bg-white border border-[#E5EAFB] backdrop-blur-sm rounded-2xl">
          <h2 className="font-semibold text-xl leading-[140%] text-[#222222]">
            AI의 총평
          </h2>
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex items-center p-3 gap-2.5 w-full bg-[#F8F9FC] rounded-lg">
              <span className="text-[22px] leading-[150%] text-[#222222]">
                🧚
              </span>
              <p className="font-semibold text-base leading-[150%] text-[#222222] w-3/4 break-keep">
                {summary}
              </p>
            </div>
            <p className="text-sm leading-[150%] text-[#656565]">{review}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default AIFeedbackSection;
