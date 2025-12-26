"use client";
import { useThemeStore } from "@/store/themeStore";
import { ReactNode, useEffect } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme } = useThemeStore();
  console.log(theme);
  useEffect(() => {
    console.log(theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <>{children}</>;
}
