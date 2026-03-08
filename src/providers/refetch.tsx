"use client";

import { createContext, ReactNode, useRef } from "react";

export type RefetchContext = {
  refetch: () => void;
  setRefetch: (refetch: () => void) => void;
};

export const refetchContext = createContext<RefetchContext>({
  refetch: () => {},
  setRefetch: () => {},
});

export const RefetchProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const refetchRef = useRef<() => void>(undefined);

  const setRefetch = (fn: () => void) => {
    refetchRef.current = fn;
  };

  const refetch = () => {
    refetchRef.current?.();
  };

  return (
    <refetchContext.Provider
      value={{ refetch: refetch, setRefetch: setRefetch }}
    >
      {children}
    </refetchContext.Provider>
  );
};
