import { useState } from 'react';
import PageTitle from '@/components/PageTitle';
import InputLayout from '@/components/InputLayout';
import InputField from '@/components/InputField';
import BottomButtonPanel from '@/components/BottomButtonPanel';
import Button from '@/components/Button';
import { buttonTypeKeys } from '@/constants/common';
import { ItemData } from '@/types/experience';
import { useResume } from '@/hooks/useExperience';

type ExperienceFormProps = {
  onBack: () => void;
  editItem?: ItemData;
};

const ExperienceForm = ({ onBack, editItem }: ExperienceFormProps) => {
  const { addItem, updateItem } = useResume();
  const [formData, setFormData] = useState<ItemData>(
    editItem || {
      id: Date.now().toString(),
      name: '',
      job: '',
      company: '',
      description: '',
    },
  );
  const isValid = formData.job !== '' && formData.company !== '';

  const handleSubmit = () => {
    if (editItem && editItem.id) {
      updateItem('experience', editItem.id, formData);
    } else {
      addItem('experience', formData);
    }

    onBack();
  };

  return (
    <div className="w-full max-w-md [&>*:last-child]:mb-20">
      <PageTitle
        onGoBack={onBack}
        title="경력 입력"
        subTitle="더 정확한 리포트를 받고 싶다면 주요 업무, 역할 등을 세부적으로 작성해주세요"
      />

      <form className="w-full">
        <InputLayout title="직무 명" isEssential>
          <InputField
            placeholder="ex. 프로덕트 디자이너, 프론트엔드 개발자"
            value={formData.job || ''}
            onChange={(value: string) =>
              setFormData({ ...formData, job: value })
            }
            textLimit={20}
          />
        </InputLayout>
        <InputLayout title="회사 명" isEssential>
          <InputField
            placeholder="재직한 회사 이름을 입력해주세요"
            value={formData.company || ''}
            onChange={(value: string) =>
              setFormData({ ...formData, company: value })
            }
            textLimit={20}
          />
        </InputLayout>
        <InputLayout title="경험 세부 설명">
          <InputField
            placeholder="ex) 유저 인터뷰를 통한 개선점 도출 및 가설 검증을 위한 A/B 테스트 진행"
            value={formData.description || ''}
            onChange={(value: string) =>
              setFormData({ ...formData, description: value })
            }
            isTextArea
            textLimit={500}
          />
        </InputLayout>
        <BottomButtonPanel>
          <Button
            type={isValid ? buttonTypeKeys.ACTIVE : buttonTypeKeys.DISABLED}
            onClick={isValid ? handleSubmit : undefined}
            title="완료"
          />
        </BottomButtonPanel>
      </form>
    </div>
  );
};

export default ExperienceForm;
