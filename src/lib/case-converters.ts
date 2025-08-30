const camelToSnake = (key: string): string => {
  return key.replace(/([A-Z])/g, "_$1").toLowerCase();
};

export const toSnakeCase = <T>(
  obj: T
): T extends unknown[] ? T : Record<string, unknown> => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase) as T extends unknown[]
      ? T
      : Record<string, unknown>;
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const snakeKey = camelToSnake(key);
      acc[snakeKey] = toSnakeCase((obj as Record<string, unknown>)[key]);
      return acc;
    }, {} as Record<string, unknown>) as T extends unknown[]
      ? T
      : Record<string, unknown>;
  }
  return obj as T extends unknown[] ? T : Record<string, unknown>;
};

const snakeToCamel = (key: string): string => {
  return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const toCamelCase = <T>(
  obj: T
): T extends unknown[] ? T : Record<string, unknown> => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase) as T extends unknown[]
      ? T
      : Record<string, unknown>;
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = snakeToCamel(key);
      acc[camelKey] = toCamelCase((obj as Record<string, unknown>)[key]);
      return acc;
    }, {} as Record<string, unknown>) as T extends unknown[]
      ? T
      : Record<string, unknown>;
  }
  return obj as T extends unknown[] ? T : Record<string, unknown>;
};
