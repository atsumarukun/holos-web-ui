"use client";
import { ReactNode, useContext, useEffect } from "react";
import { Breadcrumbs, breadcrumbContext } from "../molecules/Breadcrumb";

type Props = Readonly<{
  children: ReactNode;
  breadcrumbs: Breadcrumbs;
}>;

export const Template = ({ children, breadcrumbs }: Props) => {
  const context = useContext(breadcrumbContext);
  useEffect(() => {
    context?.setBreadcrumbs(breadcrumbs);
  }, [context]);

  return <>{children}</>;
};
