export const toFormData = (obj: Record<string, string | Blob>): FormData => {
  const body = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    body.append(key.replace(/([A-Z])/g, "_$1").toLowerCase(), value);
  });
  return body;
};
