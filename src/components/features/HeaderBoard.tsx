"use client";

import React from "react";

// components

// store
import { useNewBoardStore } from "@/store/NewBoardStore";

// functions and constants

export default function HeaderBoard() {
  const [workingBoard] = useNewBoardStore((state) => [state.workingBoard]);

  return (
    <nav className="md:mx-auto flex flex-wrap items-center text-base-content justify-center">
      <div className="flex text-md font-bold text-base-content">
        {workingBoard && <h1>{workingBoard.title}</h1>}
      </div>
    </nav>
  );
}
