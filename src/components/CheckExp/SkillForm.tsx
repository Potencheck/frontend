import { useEffect, useState } from 'react';
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

export const SkillForm = ({ onBack }: SkillFormProps) => {
  const { skills, deleteItem, addItem } = useResume();

  const [certSearchInput, setCertSearchInput] = useState('');
  const searchResults = [`"${certSearchInput}" 으로 등록하기`].concat(
    searchCertificates(certSearchInput),
  );

  const [selectedCertList, setSelectedCertList] = useState<string[]>([]);
  const isValid = selectedCertList.length > 0;

  // 기존 스킬 목록을 초기값으로 설정
  useEffect(() => {
    // skills 배열에서 title 속성을 추출하여 선택된 스킬 목록 초기화
    const existingSkills = skills
      .map((skill) => skill.name || '')
      .filter(Boolean);
    setSelectedCertList(existingSkills);
  }, [skills]);

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
    // 기존 스킬 목록을 모두 삭제
    skills.forEach((skill) => {
      if (skill.id) {
        deleteItem('skill', skill.id);
      }
    });

    // 새로운 스킬 목록 추가
    selectedCertList.forEach((skillName) => {
      addItem('skill', {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: skillName,
        description: '',
      });
    });

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
