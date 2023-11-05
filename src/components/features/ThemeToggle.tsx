"use client";

import React, { useState, useEffect, useCallback } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  // set theme on initial load
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  // update localstorage on theme change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");

    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", localTheme!);
    }
  }, [theme]);

  // update state on toggle
  const handleToggleTheme = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTheme(e.target.checked ? "dark" : "light");
    },
    []
  );

  // set toggle checked value
  const toggleChecked = theme === "light" ? false : true;

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          className="toggle"
          checked={toggleChecked}
          onChange={handleToggleTheme}
        />
      </label>
    </div>
  );
}
