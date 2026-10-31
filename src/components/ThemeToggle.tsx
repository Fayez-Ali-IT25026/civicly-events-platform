"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-300 transition hover:border-[#8be37a] hover:text-[#8be37a]"
    >
      {/* CSS shows the right icon, so there is no hydration mismatch */}
      <Sun size={17} className="hidden dark:block" />
      <Moon size={17} className="dark:hidden" />
    </button>
  );
};

export default ThemeToggle;