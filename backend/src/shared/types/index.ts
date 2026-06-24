export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  offset: number;
  limit: number;
  hasMore: boolean;
}
