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
      className={`p-2 rounded-2xl shadow-sm w-96 flex flex-col items-center`}
    >
      <h2 className="flex justify-between p-2 w-96 text-xl font-bold text-base-content">
        Create a new column
      </h2>
      <div className="flex items-end justify-end p-2 w-96 ">
        <button className="btn btn-primary w-full" onClick={handleAddColumn}>
          <PlusCircleIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};
