type ReportReactionSectionProps = {
  handleFeedback: (type: 'like' | 'dislike') => void;
  selectedButton: 'like' | 'dislike' | null;
};

const ReportReactionSection = ({
  handleFeedback,
  selectedButton,
}: ReportReactionSectionProps) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <button
        onClick={() => handleFeedback('like')}
        className={`flex justify-center items-center px-3 py-2 gap-2.5 rounded-[30px] border border-[#EDEDED] ${
          selectedButton === 'like' ? 'bg-[#EDEDED]' : 'bg-white'
        }`}
      >
        <span className="font-medium text-base leading-[150%] text-[#5F5F5F]">
          👍 좋아요
        </span>
      </button>
      <button
        onClick={() => handleFeedback('dislike')}
        className={`flex justify-center items-center px-3 py-2 gap-2.5 rounded-[30px] border border-[#EDEDED] ${
          selectedButton === 'dislike' ? 'bg-[#EDEDED]' : 'bg-white'
        }`}
      >
        <span className="font-medium text-base leading-[150%] text-[#5F5F5F]">
          😞 아쉬워요
        </span>
      </button>
    </div>
  );
};

export default ReportReactionSection;
