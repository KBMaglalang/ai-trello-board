"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

// components

// store
import { BoardStateStore } from "@/store/BoardStateStore";

// functions and constants

export default function HeaderBoard() {
  const pathname = usePathname();
  const [workingBoard, clearWorkingBoard] = BoardStateStore((state) => [
    state.workingBoard,
    state.clearWorkingBoard,
  ]);

  useEffect(() => {
    if (pathname === "/") {
      clearWorkingBoard();
    }
  }, [pathname, clearWorkingBoard]);

  return (
    <nav className="md:mx-auto flex flex-wrap items-center text-base-content justify-center">
      <div className="flex text-md font-bold text-base-content">
        {workingBoard && <h1>{workingBoard.title}</h1>}
      </div>
    </nav>
  );
}
