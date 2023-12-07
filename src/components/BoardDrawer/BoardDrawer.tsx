'use client';

import React from 'react';
import { Bars4Icon } from '@heroicons/react/24/solid';

// components
import BoardDrawerList from './BoardDrawerList';

// store
import { useBoardStateStore } from '@/store/BoardStateStore';

// constants and functions
import { createBoard } from '@/lib/appwrite/boards';

export function BoardDrawer() {
  const [boardList, setBoardList] = useBoardStateStore((state) => [
    state.boardList,
    state.setBoardList,
  ]);

  /**

  Handles the creation of a new board.
  @returns {Promise<void>} */
  const handleCreateNewBoards = async () => {
    const newBoard = await createBoard();
    const newBoardList = [...boardList, newBoard];

    setBoardList(newBoardList);
  };

  return (
    <div className="z-1000 drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* toggle button */}
        <label htmlFor="my-drawer" className="btn btn-outline drawer-button btn-sm">
          <Bars4Icon className="h-4 w-4" />
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        {/* sidebar */}

        <div className="menu flex h-full min-h-full w-80 flex-col overflow-hidden bg-base-200 p-4 text-base-content">
          {/* drawer title */}
          <h1 className="pb-4 text-center text-xl font-bold text-base-content">Your Boards</h1>

          {/* boards list */}
          <BoardDrawerList />

          {/* new board button */}
          <button className="btn btn-primary mt-2" onClick={handleCreateNewBoards}>
            New Board
          </button>
        </div>
      </div>
    </div>
  );
}
