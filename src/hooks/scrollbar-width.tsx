"use client";

import { useEffect, useRef } from "react";

type Props = Readonly<{
  variableName: string;
}>;

export const useScrollbarWidthVariable = ({ variableName }: Props) => {
  const scrollbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scrollbarRef.current;
    if (!element) {
      return;
    }

    const update = () => {
      requestAnimationFrame(() => {
        const scrollbarWidth = element.offsetWidth - element.clientWidth;
        element.style.setProperty(variableName, `${scrollbarWidth}px`);
      });
    };

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [variableName]);

  return { scrollbarRef };
};
