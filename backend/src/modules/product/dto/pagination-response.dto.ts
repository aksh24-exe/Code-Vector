import { ProductResponseDto } from './product-response.dto';

export interface PaginationResponseDto {
  success: boolean;
  data: ProductResponseDto[];
  offset: number;
  limit: number;
  hasMore: boolean;
}

export interface GetProductsQueryDto {
  category?: string;
  search?: string;
  limit: number;
  offset: number;
}
