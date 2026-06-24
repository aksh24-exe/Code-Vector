import cors from 'cors';
import express from 'express';
import { env } from './config/env';
import { errorHandler } from './middleware/error-handler';
import { notFound } from './middleware/not-found';
import productRoutes from './modules/product/routes/product.routes';

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN.includes(',')
      ? env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
      : env.CORS_ORIGIN,
  })
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
