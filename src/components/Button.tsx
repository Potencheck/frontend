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
  const getButtonStyle = () => {
    switch (type) {
      case buttonTypeKeys.ACTIVE:
        return {
          backgroundColor: '#0b0b0b',
          color: 'white',
        };
      case buttonTypeKeys.DISABLED:
        return {
          backgroundColor: '#a9a9a9',
          color: 'white',
        };
      case buttonTypeKeys.LINK:
        return {
          backgroundColor: 'white',
          color: '#222222',
          border: '1px solid #ededed',
        };
      default:
        return {};
    }
  };

  const baseStyle = {
    width: '100%',
    height: '48px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
  };

  const combinedStyle = {
    ...baseStyle,
    ...getButtonStyle(),
  };

  return (
    <>
      <button style={combinedStyle} onClick={onClick}>
        {icon}
        {title}
      </button>
    </>
  );
};

export default Button;
