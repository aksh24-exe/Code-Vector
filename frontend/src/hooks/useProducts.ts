import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib/api';
import type { PaginatedResponse } from '@/types';

interface UseProductsParams {
  category?: string;
  search?: string;
  limit?: number;
}

export function useProducts({ category, search, limit = 20 }: UseProductsParams) {
  return useInfiniteQuery<PaginatedResponse, Error>({
    queryKey: ['products', { category, search }],

    queryFn: ({ pageParam }) =>
      fetchProducts({
        category,
        search,
        limit,
        offset: pageParam as number,
      }),

    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.offset + lastPage.limit : undefined,

    initialPageParam: 0,
  });
}
