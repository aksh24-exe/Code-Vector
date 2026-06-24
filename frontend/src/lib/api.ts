import axios from 'axios';
import type { PaginatedResponse, Product } from '@/types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '',
  headers: { 'Content-Type': 'application/json' },
});

export interface FetchProductsParams {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export interface CreateProductPayload {
  name: string;
  category: string;
  price: number;
}

export interface CreateProductResponse {
  success: boolean;
  data: Product;
}

export async function fetchProducts(
  params: FetchProductsParams
): Promise<PaginatedResponse> {
  const searchParams = new URLSearchParams();

  if (params.category) searchParams.set('category', params.category);
  if (params.search) searchParams.set('search', params.search);
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.offset !== undefined) searchParams.set('offset', String(params.offset));

  const { data } = await apiClient.get<PaginatedResponse>(
    `/api/products?${searchParams.toString()}`
  );

  return data;
}

export async function createProduct(
  payload: CreateProductPayload
): Promise<CreateProductResponse> {
  const { data } = await apiClient.post<CreateProductResponse>('/api/products', payload);
  return data;
}
