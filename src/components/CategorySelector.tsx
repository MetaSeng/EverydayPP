import { categories } from '@/data/mockPlaces';
import { PlaceCategory } from '@/types/place';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  selected: PlaceCategory | 'all';
  onSelect: (category: PlaceCategory | 'all') => void;
}

export function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id as PlaceCategory | 'all')}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
            selected === cat.id
              ? "bg-primary text-primary-foreground shadow-warm"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          <span className="text-base">{cat.icon}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
