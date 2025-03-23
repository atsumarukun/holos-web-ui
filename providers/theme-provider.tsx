"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ComponentProps, useEffect, useState } from "react";

export const ThemeProvider = ({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    mounted && <NextThemesProvider {...props}>{children}</NextThemesProvider>
  );
};
