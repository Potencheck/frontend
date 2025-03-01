import { JobCategory, JobPosition, useUserInfo } from '@/hooks/useUserInfo';
import { useEffect, useState } from 'react';
import BottomButtonPanel from '../BottomButtonPanel';
import Button from '../Button';
import { buttonTypeKeys } from '@/constants/common';
import PageTitle from '../PageTitle';
import InputLayout from '../InputLayout';
import Dropdown from '../Dropdown';

type JobStepProps = {
  onBack: () => void;
  onNext: () => void;
};

const JobStep = ({ onBack, onNext }: JobStepProps) => {
  const { userInfo, updateUserInfo } = useUserInfo();
  const [isValid, setIsValid] = useState(false);
  const jobCategory = [
    JobCategory.DEVELOPER,
    JobCategory.DESIGNER,
    JobCategory.MARKETER,
  ];

  const jobWorkCategory = {
    [JobCategory.DEVELOPER]: ['프론트엔드', '백엔드·서버', '데이터', 'AI·ML'],
    [JobCategory.DESIGNER]: [
      '프로덕트 디자이너',
      '콘텐츠 디자이너',
      '그래픽 디자이너',
    ],
    [JobCategory.MARKETER]: ['서비스 기획자', 'PM·PO'],
  };

  // 유효성 검사
  useEffect(() => {
    setIsValid(!!userInfo.jobCategory && !!userInfo.jobPosition);
  }, [userInfo.jobCategory, userInfo.jobPosition]);

  const handleSubmit = () => {
    if (isValid) {
      onNext();
    }
  };

  return (
    <div>
      <PageTitle
        onGoBack={onBack}
        title="어떤 직무를 희망하고 계신가요?"
        subTitle="직무를 구체적으로 입력하면 더 정확한 정보를 받을 수 있어요"
      />
      <InputLayout title="직종 선택">
        <Dropdown
          value={userInfo.jobCategory}
          placeholder="직종을 선택해 주세요"
          options={jobCategory}
          setValue={(value) =>
            updateUserInfo('jobCategory', value as JobCategory)
          }
        />
      </InputLayout>
      <InputLayout title="직무 선택">
        <Dropdown
          value={userInfo.jobPosition}
          placeholder="직무를 선택해 주세요"
          options={
            userInfo.jobCategory
              ? jobWorkCategory[userInfo.jobCategory] ?? []
              : []
          }
          setValue={(value) =>
            updateUserInfo('jobPosition', value as JobPosition)
          }
        />
      </InputLayout>
      <BottomButtonPanel>
        <Button
          type={isValid ? buttonTypeKeys.ACTIVE : buttonTypeKeys.DISABLED}
          onClick={handleSubmit}
          title="다음"
        />
      </BottomButtonPanel>
    </div>
  );
};

export default JobStep;
