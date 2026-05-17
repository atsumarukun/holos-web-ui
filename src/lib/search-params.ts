type SearchParamsValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;

export const toURLSearchParams = (obj: Record<string, SearchParamsValue>) => {
  const searchParams = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (value == null) return;

    if (Array.isArray(value)) {
      value.forEach((v) => {
        searchParams.append(key, String(v));
      });
      return;
    }

    searchParams.set(key, String(value));
  });

  return searchParams;
};
