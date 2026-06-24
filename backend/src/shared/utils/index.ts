export type HttpError = Error & {
  statusCode: number;
};

export function createHttpError(statusCode: number, message: string): HttpError {
  const error = new Error(message) as HttpError;
  error.statusCode = statusCode;
  return error;
}

export function isHttpError(error: unknown): error is HttpError {
  return (
    error instanceof Error &&
    'statusCode' in error &&
    typeof (error as HttpError).statusCode === 'number'
  );
}
