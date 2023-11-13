"use client";

import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  boardData: any;
};

// components

// store
import { BoardStateStore } from "@/store/BoardStateStore";

// constants and functions
import { createColumn } from "@/lib/appwrite/columns";
import { addColumnToBoard } from "@/lib/util";

export const EmptyColumn = ({ boardData }: Props) => {
  const [getBoardList] = BoardStateStore((state) => [state.getBoardList]);

  const handleAddColumn = async () => {
    // create a new column
    const newColumnData = await createColumn();

    // update the board with new column
    await addColumnToBoard(boardData, newColumnData);

    // update the boardList
    await getBoardList();
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
