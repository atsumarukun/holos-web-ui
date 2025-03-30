export const actionsErrorCode = {
  BadRequest: "BAD_REQUEST",
  Unauthorized: "UNAUTHORIZED",
  NotFound: "NOT_FOUND",
  Conflict: "CONFLICT",
  Internal: "INTERNAL",
  Unknown: "UNKNOWN",
} as const;
export type ActionsErrorCode =
  (typeof actionsErrorCode)[keyof typeof actionsErrorCode];

export const toActionsErrorCode = (status: number): ActionsErrorCode => {
  switch (status) {
    case 400:
      return actionsErrorCode.BadRequest;
    case 401:
      return actionsErrorCode.Unauthorized;
    case 404:
      return actionsErrorCode.NotFound;
    case 409:
      return actionsErrorCode.Conflict;
    case 500:
      return actionsErrorCode.Internal;
    default:
      return actionsErrorCode.Unknown;
  }
};

export type ActionsError = {
  readonly type: string;
  readonly message: string;
  readonly code: ActionsErrorCode;
};

export const isActionsError = (value: any): value is ActionsError => {
  return "type" in value && value.type === "ActionsError";
};
