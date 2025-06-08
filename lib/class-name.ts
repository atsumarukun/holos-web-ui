export const buildClassName = (
  ...className: (string | undefined)[]
): string => {
  return className.filter((v) => !!v).join(" ");
};
