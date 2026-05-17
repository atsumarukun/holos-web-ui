export const buildKey = (currentKey: string, name: string): string => {
  if (currentKey) {
    return currentKey + "/" + name;
  }
  return name;
};
