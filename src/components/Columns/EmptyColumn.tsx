"use client";

import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

// components

// store
import { useBoardStateStore } from "@/store/BoardStateStore";

// constants and functions
import { createColumn } from "@/lib/appwrite/columns";
import { addColumnToBoard } from "@/lib/util";

type Props = {
  boardData: any;
};

export const EmptyColumn = ({ boardData }: Props) => {
  const [boardList, setBoardList, setWorkingBoard] = useBoardStateStore(
    (state) => [state.boardList, state.setBoardList, state.setWorkingBoard]
  );

  const handleAddColumn = async () => {
    // create a new column
    const newColumnData = await createColumn();

    // update the board with new column
    const newBoard = await addColumnToBoard(boardData, newColumnData);

    // update the boardList locally
    const newBoardList = boardList.map((board) => {
      if (board.$id === newBoard.$id) {
        return newBoard;
      }

      return board;
    });

    setBoardList(newBoardList);
    setWorkingBoard(newBoard);
  };

  return (
    <div
      className={`p-2 rounded-2xl shadow-sm w-96 flex flex-col items-center`}
    >
      <div>
        <h2 className="flex  w-full text-center text-xl font-bold text-base-content">
          Create New Column
        </h2>
      </div>

      <div className="flex items-end justify-end p-2 w-96">
        <button className="btn btn-accent w-full" onClick={handleAddColumn}>
          <PlusCircleIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
