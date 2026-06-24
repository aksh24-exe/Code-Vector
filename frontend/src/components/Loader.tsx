import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton loader for the product table.
 * Shows 5 placeholder rows while products are loading.
 */
export function Loader() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 rounded-lg border">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-4 w-1/5" />
          <Skeleton className="h-4 w-1/5" />
          <Skeleton className="h-4 w-1/5" />
        </div>
      ))}
    </div>
  );
}
