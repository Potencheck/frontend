import { ReactNode } from 'react';
import { buttonTypeKeys } from '@/constants/common';

type buttonProps = {
  type: buttonTypeKeys; // 정의된 버튼을 3가지 타입으로 나누었습니다.
  title?: string; // 버튼에 포함되는 글자 (optional)
  onClick?: () => void; // 클릭 이벤트 핸들러 (optional)
  icon?: ReactNode; // 아이콘 커스텀
};

// BottomButtonPanel 내부에서 사용
const Button = ({ type, title, onClick, icon }: buttonProps) => {
  switch (type) {
    case buttonTypeKeys.ACTIVE:
      return (
        <button
          className={`bg-[#0b0b0b] text-white flex items-center justify-center gap-2 w-full h-12 subtle2-semibold rounded-lg cursor-pointer`}
          onClick={onClick}
        >
          {icon}
          {title}
        </button>
      );
    case buttonTypeKeys.DISABLED:
      return (
        <button
          className={`bg-[#a9a9a9] text-white flex items-center justify-center gap-2 w-full h-12 subtle2-semibold rounded-lg cursor-pointer`}
          onClick={onClick}
        >
          {icon}
          {title}
        </button>
      );

    case buttonTypeKeys.LINK:
      return (
        <button
          className={`bg-white border-[#ededed] border text-[#222222] flex items-center justify-center gap-2 w-full h-12 subtle2-semibold rounded-lg cursor-pointer`}
          onClick={onClick}
        >
          {icon}
          {title}
        </button>
      );

    default:
      return '';
  }
};

export default Button;
