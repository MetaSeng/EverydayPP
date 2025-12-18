import { SearchFilters as SearchFiltersType } from '@/types/place';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

interface SortSelectorProps {
  value: SearchFiltersType['sortBy'];
  onChange: (value: SearchFiltersType['sortBy']) => void;
}

export function SortSelector({ value, onChange }: SortSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="smart-score">Smart Score</SelectItem>
        <SelectItem value="rating">Highest Rated</SelectItem>
        <SelectItem value="reviews">Most Reviews</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
}
