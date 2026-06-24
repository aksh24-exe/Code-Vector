import { Router } from 'express';
import { createProductHandler, getProductsHandler } from '../controller/product.controller';
import { validateBody, validateQuery } from '../../../middleware/validate';
import { createProductSchema, getProductsQuerySchema } from '../validation/product.validation';

const router = Router();

router.get('/', validateQuery(getProductsQuerySchema), getProductsHandler);
router.post('/', validateBody(createProductSchema), createProductHandler);

export default router;
