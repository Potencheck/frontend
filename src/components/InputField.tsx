import { ChangeEvent, useState } from 'react';

const INPUT_STATUS = {
  DISABLED: 'DISABLED',
  TYPING: 'TYPING',
} as const;

type InputStatus = (typeof INPUT_STATUS)[keyof typeof INPUT_STATUS];

// InputProps 타입 정의: Input 컴포넌트의 props 타입을 지정합니다.
type InputProps = {
  placeholder: string; // 플레이스홀더 텍스트
  value: string | null; // 입력 필드의 현재 값
  textLimit?: number; // 입력 자수 제한(선택)
  onChange: (value: string) => void; // 입력값 변경 시 호출될 함수
  onBlur?: () => void; // 입력 필드에서 포커스가 빠져나갈 때 호출될 함수 (선택적)
  clearInvalid?: () => void; // 토글 시 invalid 상태를 해제할 함수 (선택적)
  onDelete?: () => void; // 삭제 버튼 클릭 시 호출될 함수 (선택적)
  isTextArea?: boolean; // textarea 여부(선택)
};

// inputStyler 함수: 입력 필드의 상태에 따른 스타일을 반환합니다.
const inputStyler = (status: InputStatus) => {
  switch (status) {
    case INPUT_STATUS.DISABLED:
      return 'border-border-line [--input-color:#bdbdbd]';
    case INPUT_STATUS.TYPING:
      return 'border-black text-black';
  }
};

// InputLayout 내부에서 사용
const InputField = ({
  placeholder,
  onChange,
  textLimit,
  onBlur,
  clearInvalid,
  value,
  isTextArea,
}: InputProps) => {
  // 현재 입력 필드의 상태를 관리합니다.
  const [currentStatus, setCurrentStatus] = useState<InputStatus>(
    INPUT_STATUS.DISABLED,
  );
  const [isInvalid, setIsInvalid] = useState(false);

  // 입력값 변경 핸들러
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange(e.target.value);
    if (!!textLimit && e.target.value.length > textLimit) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
    if (clearInvalid) clearInvalid();
  };

  // Input focus 여부에 따른 style 핸들러
  const handleFocus = (type: string) => {
    if (clearInvalid) clearInvalid();
    if (type === 'click') {
      setCurrentStatus(INPUT_STATUS.TYPING);
      return;
    }
    setCurrentStatus(INPUT_STATUS.DISABLED);
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
    setCurrentStatus(INPUT_STATUS.DISABLED);
  };

  return (
    <>
      <div
        className={`w-full flex gap-2 whitespace-nowrap items-center justify-between text-left body-2 border rounded-lg ${inputStyler(
          currentStatus,
        )} bg-white py-3 pl-4 pr-[14px]`}
      >
        {/* text field */}
        {isTextArea ? (
          <textarea
            className="w-full h-40 outline-none placeholder:text-[var(--input-color)]"
            placeholder={placeholder}
            onClick={() => handleFocus('click')}
            onBlur={handleBlur}
            onChange={handleInputChange}
          >
            {value}
          </textarea>
        ) : (
          // input field
          <input
            placeholder={placeholder}
            value={value ?? ''}
            className={
              'w-full outline-none placeholder:text-[var(--input-color)]'
            }
            onClick={() => handleFocus('click')}
            onBlur={handleBlur}
            onChange={handleInputChange}
            type={'text'}
          />
        )}
      </div>
      {/* text/input field 하단 경고 문구와 글자 수 측정기 */}

      {!!textLimit && (
        <div className="flex justify-between mt-2">
          <div className="body3-regular text-warning">
            {isInvalid ? `${textLimit}자 이내로 입력해주세요.` : ''}
          </div>
          <div className="flex body3-regular">
            <span
              className={`${
                (value?.length ?? 0) > textLimit
                  ? 'text-warning'
                  : 'text-text-primary'
              } mr-1`}
            >
              {value?.length ?? 0}
            </span>
            <span className="text-text-secondary">{` / ${textLimit}`}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default InputField;
