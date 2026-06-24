import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export function validateQuery(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid query params',
        details: result.error.flatten().fieldErrors,
      });
    }

    req.validatedQuery = result.data;
    next();
  };
}

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request body',
        details: result.error.flatten().fieldErrors,
      });
    }

    req.validatedBody = result.data;
    next();
  };
}
