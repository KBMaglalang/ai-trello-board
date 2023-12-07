'use client';

import React, { useState, useEffect } from 'react';

// components
import { BoardListItem } from '.';
import { CreateNewBoard } from '.';

// store
import { useBoardStateStore } from '@/store/BoardStateStore';

// constants and functions

export function BoardList() {
  const [boardList] = useBoardStateStore((state) => [state.boardList]);
  const [sortedBoardList, setSortedBoardList] = useState<any[]>([]);

  /**

  Executes a side effect to sort the board list by the $updatedAt property.
  @returns {void} */
  useEffect(() => {
    if (boardList) {
      // sort the boardlist by the $updatedAt property
      const sortedList = boardList.sort((a, b) => {
        return new Date(b?.$updatedAt).getTime() - new Date(a?.$updatedAt).getTime();
      });

      setSortedBoardList(sortedList);
    }
  }, [boardList]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {sortedBoardList &&
        sortedBoardList.map((board) => <BoardListItem key={board.$id!} boardData={board} />)}

      {/* create new board button */}
      <CreateNewBoard />
    </div>
  );
}
