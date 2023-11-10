"use client";

import React, { useState, useEffect } from "react";
import { Bars4Icon } from "@heroicons/react/24/solid";

// components
import BoardDrawerList from "./BoardDrawerList";

// store
import { BoardStateStore } from "@/store/BoardStateStore";

// constants and functions
import { createBoard } from "@/lib/appwrite/boards";

export default function BoardDrawer() {
  const [getBoardList] = BoardStateStore((state) => [state.getBoardList]);

  const handleCreateNewBoards = async () => {
    await createBoard();

    await getBoardList();
  };

  return (
    <div className="drawer z-1000">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* toggle button */}
        <label
          htmlFor="my-drawer"
          className="btn btn-outline btn-sm drawer-button"
        >
          <Bars4Icon className="w-4 h-4" />
        </label>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* sidebar */}

        <div className="flex flex-col menu p-4 w-80 min-h-full bg-base-200 text-base-content h-full overflow-hidden">
          {/* drawer title */}
          <h1 className="text-xl font-bold text-center text-base-content pb-4">
            Your Boards
          </h1>

          {/* boards list */}
          <BoardDrawerList />

          {/* new board button */}
          <button
            className="btn btn-primary mt-2"
            onClick={handleCreateNewBoards}
          >
            New Board
          </button>
        </div>
      </div>
    </div>
  );
}
