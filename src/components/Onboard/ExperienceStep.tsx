import { buttonTypeKeys } from '@/constants/common';
import BottomButtonPanel from '@/components/BottomButtonPanel';
import Button from '@/components/Button';
import { useState } from 'react';
import PageTitle from '@/components/PageTitle';
import UploadIcon from '@/assets/icons/icon_share.svg?react';

const ExperienceStep = ({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: (option: string) => void;
}) => {
  const [experienceType, setExperienceType] = useState<string | null>(null);
  const isValid = experienceType !== null;

  return (
    <div>
      <PageTitle
        onGoBack={onBack}
        title="직무 경험을 첨부할 포맷을 선택해 주세요"
        subTitle="실무 경력 뿐만 아니라 대외활동, 부트캠프도 직무 경험이 될 수 있어요"
      />
      <section className="flex flex-col gap-6 py-3">
        <div
          className={
            experienceType === 'file/link'
              ? `border border-black rounded-lg`
              : `border border-border-line rounded-lg`
          }
        >
          <Button
            type={buttonTypeKeys.LINK}
            icon={<UploadIcon />}
            title="링크 / 파일로 불러올게요"
            onClick={() => setExperienceType('file/link')}
          />
        </div>
        <div
          className={
            experienceType === 'type'
              ? `border border-black rounded-lg`
              : `border border-border-line rounded-lg`
          }
        >
          <Button
            type={buttonTypeKeys.LINK}
            title="직접 입력할게요"
            onClick={() => setExperienceType('type')}
          />
        </div>
      </section>

      <BottomButtonPanel>
        <Button
          type={isValid ? buttonTypeKeys.ACTIVE : buttonTypeKeys.DISABLED}
          onClick={isValid ? () => onNext(experienceType) : undefined}
          title="다음"
        />
      </BottomButtonPanel>
    </div>
  );
};

export default ExperienceStep;
