export const errorCode = {
  BadRequest: "BAD_REQUEST",
  Unauthenticated: "UNAUTHENTICATED",
  Unauthorized: "UNAUTHORIZED",
  NotFound: "NOT_FOUND",
  Duplicate: "DUPLICATE",
  ConstraintViolation: "CONSTRAINT_VIOLATION",
  InvalidInput: "INVALID_INPUT",
  InternalServerError: "INTERNAL_SERVER_ERROR",
  Unknown: "UNKNOWN",
} as const;

export type ErrorCode = (typeof errorCode)[keyof typeof errorCode];

export type ActionError = Readonly<{
  code: ErrorCode;
  message: string;
}>;

export type ErrorResponse = Readonly<{
  error: ActionError;
}>;

export const toActionError = (err: unknown): ActionError => {
  return {
    code: errorCode.Unknown,
    message: err instanceof Error ? err.message : "internal server error",
  };
};
