
import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Button
      variant="ghost"
      size="sm"
      className="p-2 hover:bg-[var(--bg-tertiary)] transition-all duration-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      onClick={() => setDarkMode((d) => !d)}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
