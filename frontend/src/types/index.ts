export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse {
  success: boolean;
  data: Product[];
  offset: number;
  limit: number;
  hasMore: boolean;
}

export interface ApiError {
  success: false;
  error: string;
  details?: unknown;
}

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Beauty',
  'Food',
  'Automotive',
  'Health',
] as const;

export type Category = typeof CATEGORIES[number];
