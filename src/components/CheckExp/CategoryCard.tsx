import ItemCard from '@/components/CheckExp/ItemCard';
import AddIcon from '@/assets/icons/icon_plus.svg?react';
import { ItemData, ViewType } from '@/types/experience';

type CategoryCardProps = {
  title: string;
  icon: React.ReactNode;
  items: ItemData[];
  category: ViewType;
  onAddClick: () => void;
  onEditClick?: (type: ViewType, id: string) => void;
  emptyState?: boolean;
};

// 카테고리 카드 컴포넌트
const CategoryCard = ({
  title,
  icon,
  items = [],
  category,
  onAddClick,
  onEditClick,
  emptyState = true,
}: CategoryCardProps) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-4 mb-4">
      {/* 카테고리 제목 */}
      <div className="flex items-center mb-4">
        <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
          <span className="mr-1">{icon}</span>
          <span className="body1-medium text-text-secondary">{title}</span>
          <span className="body1-medium text-text-secondary ml-1">
            {items.length > 0 && items.length + '개'}
          </span>
        </div>
      </div>

      {/* 비어있는 상태 */}
      {emptyState && items.length === 0 && (
        <button
          onClick={onAddClick}
          className="w-full border border-border-line rounded-lg py-3 flex items-center justify-center text-text-primary"
        >
          <span className="text-xl mr-1">+</span> 추가하기
        </button>
      )}

      {/* 내용이 있는 상태 */}
      {items.length > 0 && (
        <div className="space-y-4">
          {items.map((item, index) => (
            <ItemCard
              key={index}
              {...item}
              category={category}
              onEditClick={onEditClick}
            />
          ))}

          <button
            onClick={onAddClick}
            className="w-full border border-border-line rounded-lg py-3 flex items-center justify-center text-text-primary"
          >
            <span className="text-xl mr-1">
              <AddIcon />
            </span>
            추가하기
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
