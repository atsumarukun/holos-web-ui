export const logoSizes = {
  sm: {
    label: "text-lg",
    image: 20,
  },
  base: {
    label: "text-xl",
    image: 24,
  },
  lg: {
    label: "text-2xl",
    image: 28,
  },
  xl: {
    label: "text-3xl",
    image: 32,
  },
} as const;

export type LogoSize = keyof typeof logoSizes;
