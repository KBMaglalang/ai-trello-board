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
      className="btn flex flex-col space-y-2 bg-base-300 text-base-content rounded-md shadow-md w-96 h-48"
    >
      <div className="card-body">
        <div className="flex flex-col w-full h-full">
          {/* title */}
          <div>
            <h1 className={`text-xl font-bold `}>{boardData.title}</h1>
          </div>

          {/* number of columns */}
          <div className="flex-1 flex-col flex items-center justify-center">
            <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md">
              Columns: {boardData.columns.length}
            </span>
          </div>

          {/* last updated */}
          {boardData.$updatedAt && (
            <div>
              <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md ">
                Last Updated: {new Date(boardData.$updatedAt).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
