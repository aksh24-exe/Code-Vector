import { Product } from '../../../drizzle/schema';
import { ProductResponseDto } from '../dto/product-response.dto';

export function mapProductToResponse(product: Product): ProductResponseDto {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

export function mapProductsToResponse(products: Product[]): ProductResponseDto[] {
  const result: ProductResponseDto[] = [];

  for (const product of products) {
    result.push(mapProductToResponse(product));
  }

  return result;
}
