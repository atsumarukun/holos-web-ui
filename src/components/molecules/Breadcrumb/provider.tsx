"use client";

import { createContext, useState } from "react";

export type Breadcrumbs = {
  label: string;
  href: string;
}[];

type BreadcrumbContext = {
  breadcrumbs: Breadcrumbs;
  setBreadcrumbs: (v: Breadcrumbs) => void;
};

export const breadcrumbContext = createContext<BreadcrumbContext | undefined>(
  undefined
);

export const BreadcrumbProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumbs>([]);
  return (
    <breadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </breadcrumbContext.Provider>
  );
};
