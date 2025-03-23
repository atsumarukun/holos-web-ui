"use client";

import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";
import { IconButton } from "../atoms/IconButton";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  if (theme === "dark") {
    return <IconButton icon={LuSun} onClick={() => setTheme("light")} />;
  }

  return <IconButton icon={LuMoon} onClick={() => setTheme("dark")} />;
};
