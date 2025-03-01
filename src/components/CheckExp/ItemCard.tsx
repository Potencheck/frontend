import GoEditIcon from '@/assets/icons/icon_arrow.svg?react';

export type ItemCardProps = {
  id?: string | null;
  job?: string | null;
  company?: string | null;
  description?: string | null;
  title?: string | null;
  subtitle?: string | null;
  onClick?: () => void;
};

// 각 아이템 카드 컴포넌트
const ItemCard = ({
  job,
  company,
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
        <div className="subtle2-semibold text-text-primary">{title || job}</div>
        <GoEditIcon className="rotate-270" />
      </div>

      {subtitle && (
        <div className="body3-medium text-text-secondary">
          {subtitle || company}
        </div>
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
