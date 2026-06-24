import { NextFunction, Request, Response } from 'express';
import { createProduct, getProducts } from '../service/product.service';
import { CreateProductInput, GetProductsQueryInput } from '../validation/product.validation';

export async function getProductsHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.validatedQuery as GetProductsQueryInput;
    const result = await getProducts(query);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function createProductHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.validatedBody as CreateProductInput;
    const product = await createProduct(body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
}
