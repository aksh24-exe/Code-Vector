import { index, numeric, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const products = pgTable(
  'products',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    category: varchar('category', { length: 100 }).notNull(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    createdAtIdIdx: index('idx_products_created_at_id').on(table.createdAt, table.id),
    categoryCreatedAtIdIdx: index('idx_products_category_created_at_id').on(
      table.category,
      table.createdAt,
      table.id
    ),
  })
);

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
