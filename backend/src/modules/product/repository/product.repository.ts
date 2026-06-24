import { and, desc, eq, ilike } from 'drizzle-orm';
import { db } from '../../../config/db';
import { NewProduct, Product, products } from '../../../drizzle/schema';

type FindManyParams = {
  category?: string;
  name?: string;
  limit: number;
  offset: number;
};

export async function findManyProducts(params: FindManyParams): Promise<Product[]> {
  const { category, name, limit, offset } = params;

  const conditions = [];

  if (category) {
    conditions.push(eq(products.category, category));
  }

  if (name) {
    conditions.push(ilike(products.name, `%${name}%`));
  }

  const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;

  return db
    .select()
    .from(products)
    .where(whereCondition)
    .orderBy(desc(products.createdAt), desc(products.id))
    .limit(limit)
    .offset(offset);
}

export async function createProduct(data: NewProduct): Promise<Product> {
  const rows = await db.insert(products).values(data).returning();
  return rows[0];
}
