"use client";

import React, { useState, useEffect } from "react";

// components
import { BoardListItem } from ".";
import { CreateNewBoard } from ".";

// store
import { useBoardStateStore } from "@/store/BoardStateStore";

// constants and functions

export function BoardList() {
  const [boardList] = useBoardStateStore((state) => [state.boardList]);
  const [sortedBoardList, setSortedBoardList] = useState([]);

  useEffect(() => {
    if (boardList) {
      // sort the boardlist by the $updatedAt property
      const sortedList = boardList.sort((a, b) => {
        return (
          new Date(b?.$updatedAt).getTime() - new Date(a?.$updatedAt).getTime()
        );
      });

      setSortedBoardList(sortedList);
    }
  }, [boardList]);

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center">
      {sortedBoardList &&
        sortedBoardList.map((board) => (
          <BoardListItem key={board.$id!} boardData={board} />
        ))}

      {/* create new board button */}
      <CreateNewBoard />
    </div>
  );
}
