import { ReactNode } from 'react';

// 버튼을 담을 화면 하단 패널 (레이아웃에 관계없이 화면 하단 고정)
const BottomButtonPanel = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full fixed bottom-0 left-0 flex flex-row items-center justify-center py-3 box-border text-center subtle2-semibold z-10">
      <div className="w-full max-w-[450px] px-5 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default BottomButtonPanel;
