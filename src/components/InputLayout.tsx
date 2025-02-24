import { ReactNode } from 'react';

type InputLayOutProps = {
  title: string;
  children: ReactNode;
  isEssential?: boolean;
};
const InputLayout = ({ title, children, isEssential }: InputLayOutProps) => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-start subtle2-medium text-text-secondary py-3">
        <div className="relative">
          {title}
          {isEssential && (
            <div className="w-1.5 absolute !m-0 top-[0rem] right-[-0.5rem] text-input h-1.5 z-[1]">
              *
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default InputLayout;
