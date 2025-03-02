import BackIcon from '@/assets/icons/Icon_Back.svg?react';

type PageTitleProps = {
  isBackButtonVisible?: boolean;
  onGoBack?: () => void;
  title?: string;
  subTitle?: string;
  bgColor?: string;
};

const PageTitle = ({
  onGoBack,
  isBackButtonVisible = true,
  title,
  subTitle,
  bgColor = 'background-card',
}: PageTitleProps) => {
  return (
    <>
      {isBackButtonVisible && (
        <header
          className={`w-full py-3 sticky top-0 bg-${
            bgColor || 'background-card'
          } z-20`}
        >
          <div className="w-5 h-5" onClick={onGoBack}>
            <BackIcon />
          </div>
        </header>
      )}
      {title && (
        <section className="pt-3 pb-6 flex flex-col gap-2">
          <h1 className="head-h1 break-keep whitespace-pre-line">{title}</h1>
          <p className="subtle2-regular text-text-secondary break-keep">
            {subTitle}
          </p>
        </section>
      )}
    </>
  );
};

export default PageTitle;
