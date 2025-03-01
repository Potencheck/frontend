import { useState } from 'react';
import PageTitle from '../PageTitle';
import InputLayout from '../InputLayout';
import InputField from '../InputField';
import BottomButtonPanel from '../BottomButtonPanel';
import Button from '../Button';
import { buttonTypeKeys } from '@/constants/common';
import { ItemData } from '@/types/experience';
import { useResume } from '@/hooks/useExperience';

type ActivityFormProps = {
  onBack: () => void;
  editItem?: ItemData;
};

export const ActivityForm = ({ onBack, editItem }: ActivityFormProps) => {
  const { addItem, updateItem } = useResume();
  const [formData, setFormData] = useState<ItemData>(
    editItem || {
      id: Date.now().toString(),
      name: '',
      description: '',
    },
  );
  const isValid = formData.name !== '';

  const handleSubmit = () => {
    if (editItem && editItem.id) {
      updateItem('activity', editItem.id, formData);
    } else {
      addItem('activity', formData);
    }

    onBack();
  };

  return (
    <div className="max-w-md [&>*:last-child]:mb-20">
      <PageTitle
        onGoBack={onBack}
        title="📝 직무 활동 입력"
        subTitle="더 정확한 리포트를 받고 싶다면 주요 업무, 역할 등을 세부적으로 작성해주세요"
      />

      <form className="w-full">
        <InputLayout title="활동 명" isEssential>
          <InputField
            placeholder="ex. 부트캠프, IT동아리, 해커톤"
            value={formData.name || ''}
            onChange={(value: string) =>
              setFormData({ ...formData, name: value })
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

export default ActivityForm;
