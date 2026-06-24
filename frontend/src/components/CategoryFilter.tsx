import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORIES } from '@/types';

interface CategoryFilterProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

/**
 * CategoryFilter — controlled select for filtering products by category.
 *
 * "All Categories" maps to undefined so the query param is omitted entirely
 * (not sent as category=undefined or category=).
 */
export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">
        Category
      </label>
      <Select
        value={value ?? 'all'}
        onValueChange={(v) => onChange(v === 'all' ? undefined : v)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
