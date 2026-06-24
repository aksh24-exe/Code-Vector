import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoadMoreButtonProps {
  onClick: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

/**
 * LoadMoreButton — fetches the next offset page via fetchNextPage().
 */
export function LoadMoreButton({
  onClick,
  isFetchingNextPage,
  hasNextPage,
}: LoadMoreButtonProps) {
  if (!hasNextPage) {
    return (
      <p className="text-center text-sm text-muted-foreground py-6">
        You have reached the end of the list.
      </p>
    );
  }

  return (
    <div className="flex justify-center py-6">
      <Button
        onClick={onClick}
        disabled={isFetchingNextPage}
        variant="outline"
        size="lg"
      >
        {isFetchingNextPage ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading more...
          </>
        ) : (
          'Load More'
        )}
      </Button>
    </div>
  );
}
