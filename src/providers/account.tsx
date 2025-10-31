"use client";

import React, { createContext } from "react";

export type AccountContext = {
  accountName: string;
};

export const accountContext = createContext<AccountContext>({
  accountName: "",
});

export const AccountProvider = ({
  children,
  accountName,
}: Readonly<{
  children: React.ReactNode;
  accountName: string;
}>) => {
  return (
    <accountContext.Provider value={{ accountName: accountName }}>
      {children}
    </accountContext.Provider>
  );
};
