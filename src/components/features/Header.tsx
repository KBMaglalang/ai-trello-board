import React from "react";
import Link from "next/link";

// constants and functions
import { PROJECT_NAME } from "@/constants";

// components
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="text-gray-600 body-font">
      <div className="mx-auto flex flex-wrap px-5 py-2 flex-col md:flex-row items-center">
        <Link
          href={"/"}
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <span className="ml-3 text-sm">{PROJECT_NAME}</span>
        </Link>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {/* <a className="mr-5 btn">Sign Up</a> */}
          {/* <a className="mr-5 btn">Second Link</a>
          <a className="mr-5 btn">Third Link</a>
          <a className="mr-5 btn">Fourth Link</a> */}
        </nav>

        {/* toggle for light and dark mode */}
        <ThemeToggle />
      </div>
    </header>
  );
}
