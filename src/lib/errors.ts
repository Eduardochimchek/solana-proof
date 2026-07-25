export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 422);
    this.name = "ValidationError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
    this.name = "ConflictError";
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

const GENERIC_SERVER_ERROR_MESSAGE = "Erro inesperado. Tente novamente em instantes.";

/**
 * Maps a thrown error to an API-safe response. Known `AppError`s carry a
 * message that is safe to show to end users. Anything else (parser errors,
 * database failures, RPC timeouts, etc.) is logged server-side only, since
 * its message may reveal internal implementation details.
 */
export function toErrorResponse(error: unknown): { message: string; statusCode: number } {
  if (error instanceof AppError) {
    return { message: error.message, statusCode: error.statusCode };
  }
  console.error("[api] Unhandled error:", error);
  return { message: GENERIC_SERVER_ERROR_MESSAGE, statusCode: 500 };
}
