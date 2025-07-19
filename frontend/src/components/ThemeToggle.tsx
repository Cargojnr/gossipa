import React, { useEffect, useState } from "react";

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Update theme
  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  return (
    <div className="relative w-14 h-8 flex items-center cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
      <div className="w-full h-full bg-gray-300 dark:bg-zinc-600 rounded-full transition-colors duration-300" />
      <div
        className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
          darkMode ? "translate-x-6" : "translate-x-0"
        }`}
      />
      <span className="absolute left-2 text-xs">☀️</span>
      <span className="absolute right-2 text-xs">🌙</span>
    </div>
  );
};

export default ThemeToggle;
