import { buttonTypeKeys } from '@/constants/common';
import BottomButtonPanel from '@/components/BottomButtonPanel';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import PageTitle from '@/components/PageTitle';
import CheckIcon from '@/assets/icons/check-white.svg?react';
import DocIcon from '@/assets/icons/file.svg?react';
import LinkIcon from '@/assets/icons/link-angled.svg?react';
import { Experience, useUserInfo } from '@/hooks/useUserInfo';

const enum ExpType {
  FILE = 'file',
  LINK = 'link',
}

type LinkStepProps = {
  onBack: () => void;
  onNext: () => void;
};

const LinkStep = ({ onBack, onNext }: LinkStepProps) => {
  const { updateUserInfo } = useUserInfo();
  const [experienceType, setExperienceType] = useState<ExpType>(ExpType.FILE);
  const [experience, setExperience] = useState<Experience>({
    file: null,
    link: '',
  });
  const [isValid, setIsValid] = useState(false);

  // 링크/파일 선택 핸들러
  const handleExpTypeSelect = (type: ExpType) => {
    setExperience({ file: null, link: '' });
    setExperienceType(type);
  };

  // 파일 첨부 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setExperience({ file: e.target.files[0], link: '' });
      updateUserInfo('experience', { file: e.target.files[0], link: '' });
    }
  };

  // 파일 이름 간략화 함수
  const truncateFileName = (fileName: string) => {
    const maxLength = 35;
    if (!fileName) return '';

    // 파일 확장자 추출
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex === -1) {
      // 확장자가 없는 경우
      return fileName.length <= maxLength
        ? fileName
        : fileName.substring(0, maxLength / 2) +
            '...' +
            fileName.substring(fileName.length - maxLength / 2);
    }

    const extension = fileName.substring(lastDotIndex);
    const name = fileName.substring(0, lastDotIndex);

    // 이름 + 확장자가 최대 길이보다 짧으면 그대로 반환
    if (fileName.length <= maxLength) return fileName;

    // 이름 앞부분 + ... + 이름 뒷부분 + 확장자 형식으로 반환
    const truncatedLength = maxLength - extension.length - 3; // 3은 '...'의 길이
    const half = Math.floor(truncatedLength / 2);

    return (
      name.substring(0, half) +
      '...' +
      name.substring(name.length - half) +
      extension
    );
  };

  const handleOnNext = () => {
    updateUserInfo('experience', experience);
    onNext();
  };

  useEffect(() => {
    const urlRegex =
      /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    if (experience.file || urlRegex.test(experience.link)) setIsValid(true);
    else setIsValid(false);
  }, [experience]);

  return (
    <div>
      <PageTitle
        onGoBack={onBack}
        title="직무 경험을 확인할 수 있는 링크를 입력해 주세요"
        subTitle="경력이 구체적으로 담겨있을 수록 더 정확한 리포트를 받을 수 있어요"
      />
      {/* 파일/링크 첨부 선택 */}
      <section className="flex flex-row gap-[10px] pb-1">
        <button
          className={`flex subtle2-medium rounded-full px-4 py-2 ${
            experienceType === ExpType.FILE
              ? 'bg-[#5f5f5f] text-white border border-[#5f5f5f'
              : 'bg-white text-[#5f5f5f] border border-[#ededed]'
          }`}
          onClick={() => handleExpTypeSelect(ExpType.FILE)}
        >
          {experienceType === ExpType.FILE && <CheckIcon />}
          파일 첨부
        </button>
        <button
          style={{
            backgroundColor:
              experienceType === ExpType.LINK ? '#5f5f5f' : 'white',
            color: experienceType === ExpType.LINK ? 'white' : '#5f5f5f',
            border:
              experienceType === ExpType.LINK
                ? '1px solid #5f5f5f'
                : '1px solid #ededed',
            // 다른 스타일들
          }}
          className="flex subtle2-medium rounded-full px-4 py-2"
          onClick={() => handleExpTypeSelect(ExpType.LINK)}
        >
          {experienceType === ExpType.LINK && <CheckIcon />}
          링크 첨부
        </button>
      </section>
      {/* 파일/링크 첨부 */}
      {experienceType === ExpType.FILE ? (
        <section className="py-4">
          <input
            id="file-upload"
            className="hidden"
            type={'file'}
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className={`w-full flex gap-2 whitespace-nowrap items-center text-left ${
              experience.file?.name
                ? 'text-text-secondary'
                : 'text-text-placeholder'
            } subtle2-regular border rounded-lg bg-white py-[14px] px-3 border-border-line`}
          >
            <div className="w-6 h-6">
              <DocIcon />
            </div>
            <p>
              {experience.file
                ? truncateFileName(experience.file.name)
                : 'pdf 파일만 첨부할 수 있어요.'}
            </p>
          </label>
        </section>
      ) : (
        // 링크 첨부
        <section className="py-4">
          <div
            className={`w-full flex gap-2 whitespace-nowrap items-center text-left text-text-secondary placeholder-text-placeholder subtle2-regular border rounded-lg bg-white py-[14px] px-3 border-border-line`}
          >
            <div className="w-6 h-6">
              <LinkIcon />
            </div>
            <input
              type="text"
              value={experience.link}
              placeholder="링크를 첨부해주세요"
              className="w-full outline-none"
              onChange={(e) =>
                setExperience({ file: null, link: e.target.value })
              }
            />
          </div>
        </section>
      )}

      <BottomButtonPanel>
        <Button
          type={isValid ? buttonTypeKeys.ACTIVE : buttonTypeKeys.DISABLED}
          onClick={isValid ? handleOnNext : undefined}
          title="다음"
        />
      </BottomButtonPanel>
    </div>
  );
};

export default LinkStep;
