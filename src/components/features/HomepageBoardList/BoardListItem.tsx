"use client";

import React from "react";
import Link from "next/link";

// components

// store

// constants and functions

type Props = {
  boardData: any;
};

export function BoardListItem({ boardData }: Props) {
  return (
    <Link
      href={`/board/${boardData.$id}`}
      className="flex flex-col space-y-2 bg-base-300 text-base-content rounded-md shadow-md w-96 h-48"
    >
      <div className="card-body">
        <div className="flex flex-row">
          <h1 className={`text-xl font-bold `}>{boardData.title}</h1>
        </div>

        <div>
          <p className="text-xs text-gray-400 text-end pr-4 pb-4">
            {new Date(boardData.$createdAt).toLocaleString()}
          </p>
        </div>

        {/* show number of columns in the board */}
        <div>
          <p className="text-xs text-gray-400 text-end pr-4 pb-4">
            {boardData.columns.length} columns
          </p>
        </div>
      </div>
    </Link>
  );
}
