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
import { createColumn } from "@/lib/appwrite/columns";
import { addColumnToBoard } from "@/lib/util";

export const EmptyColumn = ({ boardId, boardColumns }: Props) => {
  const handleAddColumn = async () => {
    const newColumData = await createColumn();
    await addColumnToBoard(boardId, [...boardColumns, newColumData]);

    // TODO: update the boardList
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
