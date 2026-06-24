import { PackageSearch } from 'lucide-react';

interface EmptyStateProps {
  category?: string;
  search?: string;
}

export function EmptyState({ category, search }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
      <PackageSearch className="h-12 w-12 mb-4 opacity-40" />
      <p className="text-lg font-medium">No products found</p>
      {(category || search) && (
        <p className="text-sm mt-1">
          {search && <>No results for &quot;{search}&quot;</>}
          {search && category && ' in '}
          {category && <span className="font-semibold">{category}</span>}
        </p>
      )}
    </div>
  );
}
