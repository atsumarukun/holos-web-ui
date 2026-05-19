export const buildKey = (currentKey: string, name: string): string => {
  if (currentKey) {
    return currentKey + "/" + name;
  }
  return name;
};

export const extractName = (key: string): string => {
  return key.split("/").at(-1) ?? "";
};
