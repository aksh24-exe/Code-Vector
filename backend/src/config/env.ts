import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is required in .env file');
  process.exit(1);
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
