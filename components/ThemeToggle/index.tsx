"use client";

import { useThemeStore } from "@/store/themeStore";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="border-border bg-background/50 hover:bg-accent hover:text-accent-foreground focus:ring-ring relative inline-flex h-9 w-9 items-center justify-center rounded-lg border backdrop-blur-sm transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun
        className={`absolute h-4 w-4 scale-100 rotate-0 transition-all duration-300 ${theme === "dark" ? "scale-0 -rotate-90" : ""}`}
      />
      <Moon
        className={`absolute h-4 w-4 scale-0 rotate-90 transition-all duration-300 ${theme === "dark" ? "scale-100 rotate-0" : ""}`}
      />
    </button>
  );
}
