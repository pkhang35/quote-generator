// src/components/ThemeToggle.js
import React, { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("darkMode", newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
  };

  return (
    <button
      className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg transition duration-300"
      onClick={toggleTheme}
    >
      {darkMode ? (
        <BsSun className="text-yellow-400" />
      ) : (
        <BsMoon className="text-gray-700" />
      )}
    </button>
  );
};

export default ThemeToggle;
