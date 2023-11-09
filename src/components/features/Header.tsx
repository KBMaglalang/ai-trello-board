import React from "react";
import Link from "next/link";

// components
import ThemeToggle from "./ThemeToggle";
import BoardDrawer from "./BoardDrawer";
import HeaderBoard from "./HeaderBoard";

// store

// constants and functions
import { PROJECT_NAME } from "@/constants";

export default function Header() {
  return (
    <header className="text-base-content body-font">
      <div className="mx-auto flex flex-wrap px-5 py-2 flex-col md:flex-row items-center">
        <div className="flex space-x-2 ">
          <BoardDrawer />

          <Link
            href={"/"}
            className="flex title-font font-medium items-center mb-4 md:mb-0"
          >
            <h1 className=" text-xl font-bold">{PROJECT_NAME}</h1>
          </Link>
        </div>

        <HeaderBoard />

        {/* toggle for light and dark mode */}
        <ThemeToggle />
      </div>
    </header>
  );
}
