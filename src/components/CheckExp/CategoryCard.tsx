import ItemCard from '@/components/CheckExp/ItemCard';
import AddIcon from '@/assets/icons/icon_plus.svg?react';
import { ItemData, ViewType } from '@/types/experience';
import { UserInfo, useUserInfo } from '@/hooks/useUserInfo';

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
  const { userInfo } = useUserInfo(); // 카운트 표시 로직을 분리한 헬퍼 함수
  const getCountDisplay = (
    title: string,
    items: ItemData[],
    userInfo: UserInfo,
  ) => {
    if (items.length <= 0) return;
    // 경력 카테고리인 경우
    if (title === '경력') {
      const isExperienced = userInfo?.exp === 'old';
      return isExperienced ? '1년 이상' : '1년 미만';
    }

    // 다른 카테고리인 경우 (아이템이 있을 때만 개수 표시)
    return items.length > 0 ? `${items.length}개` : '';
  };
  return (
    <div className="w-full bg-white rounded-xl shadow-sm p-4 mb-4">
      {/* 카테고리 제목 */}
      <div className="flex items-center mb-4">
        <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
          <span className="mr-1">{icon}</span>
          <span className="body1-medium text-text-secondary">{title}</span>
          <span className="body1-medium text-text-primary ml-1">
            {getCountDisplay(title, items, userInfo)}
          </span>
        </div>
      </div>

      {/* 비어있는 상태 */}
      {emptyState && items.length === 0 && (
        <button
          onClick={onAddClick}
          className="w-full border border-border-line rounded-lg py-3 flex items-center justify-center text-text-primary"
        >
          <span className="text-xl mr-1">
            <AddIcon />
          </span>
          추가하기
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
              onClick={onEditClick}
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
