"use client";

import React, { useState, useEffect } from "react";

// components
import BoardDrawerListItem from "./BoardDrawerListItem";

// store
import { useNewBoardStore } from "@/store/NewBoardStore";

// constants and functions

export default function BoardDrawerList() {
  const [boardList, getBoardList] = useNewBoardStore((state) => [
    state.boardList,
    state.getBoardList,
  ]);

  useEffect(() => {
    getBoardList();
  }, [getBoardList]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden h-full overflow-y-scroll">
      {/* Sidebar content here */}
      {boardList.map((item) => (
        <BoardDrawerListItem key={item.$id} boardData={item} />
      ))}
    </div>
  );
}
