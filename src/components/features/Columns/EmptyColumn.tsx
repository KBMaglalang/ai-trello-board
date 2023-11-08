"use client";

import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  boardId: string;
  boardColumns: string[];
};

// components
// store
// constants and functions
import { createColumn, addColumnToBoard } from "@/lib/appwrite/columns";

export const EmptyColumn = ({ boardId, boardColumns }: Props) => {
  const handleAddColumn = async () => {
    const newColumData = await createColumn();
    const response = await addColumnToBoard(boardId, [
      ...boardColumns,
      newColumData,
    ]);

    // TODO: update the boardList
  };

  return (
    <div
      className={`pb-2 bg-white/50 p-2 rounded-2xl shadow-sm flex flex-col items-center w-full max-w-7xl`}
    >
      <h2 className="flex justify-between p-2 text-xl font-bold text-white">
        Create a new column
      </h2>
      <div className="flex items-end justify-end p-2 w-full">
        <button
          className="btn glass w-full text-gray-700"
          onClick={handleAddColumn}
        >
          <PlusCircleIcon className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};
