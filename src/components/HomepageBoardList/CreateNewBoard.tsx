'use client';

import React from 'react';

// components

// store
import { useBoardStateStore } from '@/store/BoardStateStore';

// constants and functions
import { createBoard } from '@/lib/appwrite/boards';

export function CreateNewBoard() {
  const [boardList, setBoardList] = useBoardStateStore((state) => [
    state.boardList,
    state.setBoardList,
  ]);

  /**

  Handles the creation of a new board.
  @returns {void} */
  const handleCreateNewBoards = async () => {
    const newBoard = await createBoard();
    const newBoardList = [...boardList, newBoard];

    setBoardList(newBoardList);
  };

  return (
    <div
      onClick={handleCreateNewBoards}
      className="btn flex h-48 w-96 flex-col space-y-2 rounded-md bg-primary text-primary-content shadow-md"
    >
      <div className="card-body items-center justify-center text-center">
        <div className="flex flex-row">
          <h1 className={`text-xl font-bold`}>Create New Board</h1>
        </div>
      </div>
    </div>
  );
}
