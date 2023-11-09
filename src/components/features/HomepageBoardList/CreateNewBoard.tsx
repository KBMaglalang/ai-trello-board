"use client";

import React from "react";

// components

// store
import { useNewBoardStore } from "@/store/NewBoardStore";

// constants and functions
import { createBoard } from "@/lib/appwrite/boards";

export function CreateNewBoard() {
  const [getBoardList] = useNewBoardStore((state) => [state.getBoardList]);

  const handleCreateNewBoards = async () => {
    await createBoard();

    await getBoardList();
  };

  return (
    <div
      onClick={handleCreateNewBoards}
      className="flex flex-col space-y-2 btn bg-primary text-primary-content rounded-md shadow-md w-96 h-48"
    >
      <div className="card-body text-center items-center justify-center">
        <div className="flex flex-row">
          <h1 className={`text-xl font-bold`}>Create New Board</h1>
        </div>
      </div>
    </div>
  );
}
