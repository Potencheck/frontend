import { buttonTypeKeys } from '@/constants/common';
import BottomButtonPanel from '../BottomButtonPanel';
import Button from '../Button';
import { useUserInfo } from '@/hooks/useUserInfo';
import { useEffect, useState } from 'react';
import PageTitle from '../PageTitle';
import InputLayout from '../InputLayout';
import InputField from '../InputField';

// 이름 입력 단계 컴포넌트
const NameStep = ({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) => {
  const { userInfo, updateUserInfo } = useUserInfo();
  const [isValid, setIsValid] = useState(false);

  // 유효성 검사
  useEffect(() => {
    const nameLength = userInfo.name.trim().length;
    setIsValid(nameLength > 0 && nameLength < 10);
  }, [userInfo.name]);

  const handleSubmit = () => {
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="w-full inset-0">
      <PageTitle onGoBack={onBack} title="성함을 입력해주세요" />
      <InputLayout title="이름">
        <InputField
          placeholder="ex. 홍길동"
          value={userInfo.name}
          onChange={(value) => updateUserInfo('name', value)}
          textLimit={10}
        />
      </InputLayout>
      <BottomButtonPanel>
        <Button
          type={isValid ? buttonTypeKeys.ACTIVE : buttonTypeKeys.DISABLED}
          onClick={isValid ? handleSubmit : undefined}
          title="다음"
        />
      </BottomButtonPanel>
    </div>
  );
};

export default NameStep;
