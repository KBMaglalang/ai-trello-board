"use client";

import React from "react";

// components
import { BoardListItem } from ".";
import { CreateNewBoard } from ".";

// store
import { useNewBoardStore } from "@/store/NewBoardStore";

// constants and functions

export function BoardList() {
  const [boardList] = useNewBoardStore((state) => [state.boardList]);

  return (
    <div className="flex flex-wrap gap-4 w-full h-full">
      {boardList &&
        boardList.map((board) => (
          <BoardListItem key={board.$id} boardData={board} />
        ))}

      <CreateNewBoard />
    </div>
  );
}
