import GoEditIcon from '@/assets/icons/icon_arrow.svg?react';

export type ItemCardProps = {
  title: string;
  subtitle?: string;
  description?: string;
  onClick?: () => void;
};

// 각 아이템 카드 컴포넌트
const ItemCard = ({
  title,
  subtitle,
  description,
  onClick,
}: ItemCardProps) => {
  return (
    <div
      onClick={onClick}
      className="w-full border-b border-border-line pb-3 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="subtle2-semibold text-text-primary">{title}</div>
        <GoEditIcon className="rotate-270" />
      </div>

      {subtitle && (
        <div className="body3-medium text-text-secondary">{subtitle}</div>
      )}

      {description && (
        <div className="p-3 rounded-lg bg-background-field body3-regular text-text-secondary mt-1">
          {description}
        </div>
      )}
    </div>
  );
};

export default ItemCard;
