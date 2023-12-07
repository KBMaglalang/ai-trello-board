'use client';

import React, { useState, useEffect } from 'react';

// components
import BoardDrawerListItem from './BoardDrawerListItem';

// store
import { useBoardStateStore } from '@/store/BoardStateStore';

// constants and functions

export default function BoardDrawerList() {
  const [boardList, getBoardList] = useBoardStateStore((state) => [
    state.boardList,
    state.getBoardList,
  ]);
  const [sortedBoardList, setSortedBoardList] = useState<any[]>([]);

  /**

  useEffect hook that calls the getBoardList function when the component mounts.
  @param {Function} getBoardList - Function that retrieves the board list. */
  useEffect(() => {
    getBoardList();
  }, [getBoardList]);

  /**

  useEffect hook that sorts the board list by the $updatedAt property when the boardList changes.
  @param {Array} boardList - Array of board objects. */
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
    <div className="flex h-full flex-1 flex-col space-y-2 overflow-hidden overflow-y-scroll">
      {/* Sidebar content here */}
      {sortedBoardList &&
        sortedBoardList.map((item) => <BoardDrawerListItem key={item.$id} boardData={item} />)}
    </div>
  );
}
