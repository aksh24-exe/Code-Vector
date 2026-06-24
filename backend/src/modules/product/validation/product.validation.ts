import { z } from 'zod';
import { DEFAULT_PAGE_LIMIT, MAX_PAGE_LIMIT, MIN_PAGE_LIMIT } from '../../../shared/constants';

export const createProductSchema = z.object({
  name: z.string().min(1).max(255),
  category: z.string().min(1).max(100),
  price: z.number().positive(),
});

export const getProductsQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().trim().optional(),
  limit: z.coerce.number().min(MIN_PAGE_LIMIT).max(MAX_PAGE_LIMIT).default(DEFAULT_PAGE_LIMIT),
  offset: z.coerce.number().min(0).default(0),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type GetProductsQueryInput = z.infer<typeof getProductsQuerySchema>;
