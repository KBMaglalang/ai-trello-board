import React from "react";
import Link from "next/link";

// components
import { BoardDrawer } from "../BoardDrawer";
import ThemeToggle from "./ThemeToggle";
import HeaderBoard from "./HeaderBoard";
import { ResponseDrawer } from "../ResponseDrawer";

// store

// constants and functions
import { PROJECT_NAME } from "@/constants";

export function Header() {
  return (
    <header className="text-base-content body-font">
      <div className="mx-auto flex flex-wrap px-5 py-2 flex-col md:flex-row items-center">
        <div className="flex space-x-2 w-full md:w-0 justify-between">
          <div className="flex items-center justify-center">
            <BoardDrawer />
          </div>

          <div className="flex items-center justify-center">
            <Link href={"/"} className="">
              <h1 className="text-xl font-bold">{PROJECT_NAME}</h1>
            </Link>
          </div>

          <div className="block md:hidden">
            {/* <ResponseDrawer /> */}
            <ThemeToggle />
          </div>
        </div>

        {/* display the current board the user is on */}
        <HeaderBoard />

        {/* toggle for light and dark mode */}
        <div className="hidden  md:block">
          <ThemeToggle />
        </div>
        {/* <div className="flex flex-row items-center justify-center space-x-2"> */}
        <ResponseDrawer />
        {/* </div> */}
      </div>
    </header>
  );
}
