import { useState } from 'react';
import ArrowIcon from '@/assets/icons/icon_arrow.svg?react';

// Dropdown 컴포넌트의 props 타입을 정의합니다.
type DropDownProps = {
  title?: string; // 드롭다운의 제목 (선택적)
  value: string | null; // 현재 선택된 값
  placeholder: string; // 플레이스홀더 텍스트
  options: Array<string>; // 드롭다운 옵션 목록
  setValue: (value: string) => void; // 선택된 값을 설정하는 함수
};

type DropdownModalProps = {
  options: string[]; // 드롭다운 선택지 목록
  value: string | null; // 최종 선택 값
  onSelect: (option: string) => void; // 옵션 선택 핸들러
};

// DropdownModal 컴포넌트: 드롭다운 옵션을 표시하는 모달
export const DropdownModal = ({
  options,
  value,
  onSelect,
}: DropdownModalProps) => {
  return (
    <div className="w-full relative shadow-[0px_4px_12px_rgba(0,0,0,0.1)] rounded-lg bg-white border border-border-line flex flex-row items-start justify-start p-2 text-left body2-medium text-text-primary z-10">
      <div className="flex-1 flex flex-col items-start justify-start gap-[5px]">
        {/* 각 옵션을 매핑하여 표시합니다. */}
        {options.map((option, idx) => (
          <div
            className={`self-stretch overflow-hidden ${
              value == option && 'bg-dropdown text-text-primary'
            } rounded-lg flex flex-row items-center justify-start p-2.5`}
            onClick={() => onSelect(option)}
            key={idx}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

// Dropdown 컴포넌트: 드롭다운 선택 기능을 제공합니다.
const Dropdown = ({
  title,
  value,
  placeholder,
  options,
  setValue,
}: DropDownProps) => {
  // 드롭다운의 열림/닫힘 상태를 관리합니다.
  const [isOpen, setIsOpen] = useState(false);

  // 옵션 선택 핸들러
  const handleSelect = (option: string) => {
    setValue(option);
    setIsOpen(false);
  };
  return (
    <div className="w-full flex flex-col">
      {/* 드롭다운 제목 (있는 경우에만 표시) */}
      {title && (
        <div className="w-full relative flex flex-row items-center justify-start px-1 py-1.5 box-border text-left body-3 text-[#222]">
          <div className="flex-1 overflow-hidden flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-row items-center justify-start">
              <div className="relative leading-4">{title}</div>
            </div>
          </div>
        </div>
      )}
      {/* 드롭다운 입력 영역 */}
      <div className="w-full flex flex-col gap-1">
        <div className="w-full relative rounded-lg bg-white border border-border-line box-border h-11 flex flex-row items-center justify-center px-4 py-2.5 pl-4 text-left subtle2-regular text-[#656565]">
          <div className="flex-1 h-5 flex flex-row items-center justify-between">
            <input
              className="w-full relative leading-5 outline-none bg-white"
              value={value ?? ''}
              placeholder={placeholder}
              disabled
            />
            {/* 드롭다운 토글 버튼 */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-0 rounded-full transition-colors"
            >
              <div
                className={`flex items-center justify-center w-5 h-6 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                <ArrowIcon />
              </div>
            </button>
          </div>
        </div>
        {/* 드롭다운 선택지 모달 (열려있을 때만 표시) */}
        {isOpen && (
          <DropdownModal
            value={value ?? ''}
            options={options}
            onSelect={handleSelect}
          />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
