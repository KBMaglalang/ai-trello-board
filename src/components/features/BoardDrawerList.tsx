"use client";

import React, { useState, useEffect } from "react";

// components
import BoardDrawerListItem from "./BoardDrawerListItem";

// store
import { BoardStateStore } from "@/store/BoardStateStore";

// constants and functions

export default function BoardDrawerList() {
  const [boardList, getBoardList, workingBoard, workingColumn] =
    BoardStateStore((state) => [
      state.boardList,
      state.getBoardList,

      state.workingBoard,
      state.workingColumn,
    ]);
  const [sortedBoardList, setSortedBoardList] = useState([]);

  useEffect(() => {
    getBoardList();
  }, [getBoardList]);

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
    <div className="flex flex-1 flex-col overflow-hidden h-full space-y-2 overflow-y-scroll">
      {/* Sidebar content here */}
      {sortedBoardList &&
        sortedBoardList.map((item) => (
          <BoardDrawerListItem key={item.$id} boardData={item} />
        ))}
    </div>
  );
}
