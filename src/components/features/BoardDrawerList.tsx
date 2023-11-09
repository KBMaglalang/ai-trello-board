"use client";

import React, { useState, useEffect } from "react";

// components
import BoardDrawerListItem from "./BoardDrawerListItem";

// store
import { useNewBoardStore } from "@/store/NewBoardStore";

// constants and functions

export default function BoardDrawerList() {
  const [boardList, getBoardList, workingBoard, workingColumn] =
    useNewBoardStore((state) => [
      state.boardList,
      state.getBoardList,

      state.workingBoard,
      state.workingColumn,
    ]);

  useEffect(() => {
    getBoardList();
  }, [getBoardList]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden h-full space-y-2 overflow-y-scroll">
      {/* Sidebar content here */}
      {boardList.map((item) => (
        <BoardDrawerListItem key={item.$id} boardData={item} />
      ))}
    </div>
  );
}
