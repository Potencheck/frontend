import { useState } from 'react';
import PageTitle from '@/components/PageTitle';
import InputLayout from '@/components/InputLayout';
import InputField from '@/components/InputField';
import BottomButtonPanel from '@/components/BottomButtonPanel';
import Button from '@/components/Button';
import { buttonTypeKeys } from '@/constants/common';
import { ItemData } from '@/types/experience';
import { useResume } from '@/hooks/useExperience';
import { DropdownModal } from '../Dropdown';
import { searchCertificates } from '@/constants/certificate';
import CertTag from './CertTag';

type SkillFormProps = {
  onBack: () => void;
  editItem?: ItemData;
};

export const SkillForm = ({ onBack, editItem }: SkillFormProps) => {
  const { addItem, updateItem } = useResume();
  const [formData, setFormData] = useState<ItemData>(
    editItem || {
      id: Date.now().toString(),
      name: '',
    },
  );
  const [certSearchInput, setCertSearchInput] = useState('');
  const searchResults = [`"${certSearchInput}" 으로 등록하기`].concat(
    searchCertificates(certSearchInput),
  );

  const isValid = formData.name !== '' && formData.subtitle !== '';
  const [selectedCertList, setSelectedCertList] = useState<string[]>([]);

  const handleCertSelect = (cert: string) => {
    // "으로 등록하기" 옵션을 선택했을 때 원래 입력값 사용
    if (cert === `"${certSearchInput}" 으로 등록하기`) {
      setSelectedCertList([...new Set([...selectedCertList, certSearchInput])]);
    } else {
      setSelectedCertList([...new Set([...selectedCertList, cert])]);
    }
    setCertSearchInput('');
  };

  const handleSubmit = () => {
    if (editItem && editItem.id) {
      updateItem('skill', editItem.id, formData);
    } else {
      addItem('skill', formData);
    }
    setFormData(formData); // TODO : skills 쪽 타입 변경과 함께 변경 요망
    onBack();
  };

  return (
    <div className="max-w-md [&>*:last-child]:mb-20">
      <PageTitle
        onGoBack={onBack}
        title="⚡️ 자격증 및 스킬 입력"
        subTitle="취득한 자격증 및 사용 가능한 툴을 입력해주세요"
      />

      <form className="w-full">
        <InputLayout title="스킬 / 자격증 명" isEssential>
          <InputField
            placeholder="ex. 컴퓨터활용능력 1급, Powerpoint 등"
            value={certSearchInput}
            onChange={(value: string) => setCertSearchInput(value)}
          />
          {certSearchInput !== '' ? (
            <DropdownModal
              options={searchResults}
              value=""
              onSelect={(cert: string) => handleCertSelect(cert)}
            />
          ) : (
            <div className="flex flex-wrap gap-2 ">
              {selectedCertList.map((cert) => (
                <CertTag name={cert} onDelete={() => setSelectedCertList([])} />
              ))}
            </div>
          )}
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

export default SkillForm;
