"use client";

import React, { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("");

  // set theme on initial load
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  // update localstorage on theme change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");

    document.querySelector("html")?.setAttribute("data-theme", localTheme!);
  }, [theme]);

  // update state on toggle
  const handleToggleTheme = (e: any) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <input
          type="checkbox"
          className="toggle"
          checked={theme === "light" ? false : true}
          onChange={handleToggleTheme}
        />
      </label>
    </div>
  );
}
