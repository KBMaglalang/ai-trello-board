import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import { PROJECT_NAME } from "@/constants";

export default function Header() {
  return (
    <header className="text-gray-600 body-font">
      <div className="mx-auto flex flex-wrap px-5 py-2 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg> */}
          <span className="ml-3 text-sm">{PROJECT_NAME}</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {/* <a className="mr-5 btn">Sign Up</a> */}
          {/* <a className="mr-5 btn">Second Link</a>
          <a className="mr-5 btn">Third Link</a>
          <a className="mr-5 btn">Fourth Link</a> */}
        </nav>
        {/* <button className="inline-flex btn btn-primary">
          Sign In
          <ArrowRightIcon className="w-4 h-4 ml-1" />
        </button> */}
      </div>
    </header>
  );
}
