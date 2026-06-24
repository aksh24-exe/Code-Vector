import { createProduct as createProductInDb, findManyProducts } from '../repository/product.repository';
import { mapProductToResponse, mapProductsToResponse } from '../mapper/product.mapper';
import { CreateProductDto } from '../dto/create-product.dto';
import { GetProductsQueryDto, PaginationResponseDto } from '../dto/pagination-response.dto';
import { ProductResponseDto } from '../dto/product-response.dto';

export async function getProducts(query: GetProductsQueryDto): Promise<PaginationResponseDto> {
  const limit = query.limit;
  const offset = query.offset;

  const rows = await findManyProducts({
    category: query.category,
    name: query.search,
    limit: limit + 1,
    offset,
  });

  const hasMore = rows.length > limit;
  const pageRows = hasMore ? rows.slice(0, limit) : rows;

  return {
    success: true,
    data: mapProductsToResponse(pageRows),
    offset,
    limit,
    hasMore,
  };
}

export async function createProduct(input: CreateProductDto): Promise<ProductResponseDto> {
  const product = await createProductInDb({
    name: input.name,
    category: input.category,
    price: input.price.toFixed(2),
  });

  return mapProductToResponse(product);
}
