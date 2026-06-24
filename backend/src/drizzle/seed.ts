import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { products } from './schema';

const categories = [
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
];

const totalProducts = 200_000;
const batchSize = 1000;

function randomItem<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function buildBatch(startNumber: number, count: number) {
  const batch = [];

  for (let i = 0; i < count; i++) {
    const number = startNumber + i;
    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365));

    batch.push({
      name: `Product ${number}`,
      category: randomItem(categories),
      price: (Math.random() * 9999 + 1).toFixed(2),
      createdAt,
      updatedAt: createdAt,
    });
  }

  return batch;
}

async function seed() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  console.log('Starting seed...');

  for (let i = 0; i < totalProducts; i += batchSize) {
    const currentBatchSize = Math.min(batchSize, totalProducts - i);
    const batch = buildBatch(i + 1, currentBatchSize);

    await db.insert(products).values(batch);

    console.log(`Inserted ${Math.min(i + currentBatchSize, totalProducts)} / ${totalProducts}`);
  }

  console.log('Seed finished');
  await pool.end();
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
