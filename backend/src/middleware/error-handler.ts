import { NextFunction, Request, Response } from 'express';
import { isHttpError } from '../shared/utils';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (isHttpError(err)) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    error: 'Something went wrong',
  });
}
