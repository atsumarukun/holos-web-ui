export const status = {
  Unauthorized: "UNAUTHORIZED",
  Conflict: "CONFLICT",
  Internal: "INTERNAL",
} as const;

export type ActionStatus = (typeof status)[keyof typeof status];

export const isActionStatus = (s: unknown): s is ActionStatus => {
  return (
    typeof s === "string" && Object.values(status).includes(s as ActionStatus)
  );
};

export type ActionError = Readonly<{
  status: ActionStatus;
  message: string;
}>;

export const isActionError = (err: unknown): err is ActionError => {
  return (
    typeof err === "object" &&
    err !== null &&
    "status" in err &&
    "message" in err &&
    isActionStatus(err.status) &&
    typeof err.message === "string"
  );
};

export const UnauthorizedErr: ActionError = {
  status: status.Unauthorized,
  message: "unauthorized",
};
export const ConflictErr: ActionError = {
  status: status.Conflict,
  message: "conflict",
};
export const InternalErr: ActionError = {
  status: status.Internal,
  message: "internal",
};
