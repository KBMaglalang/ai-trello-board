'use client';

import React from 'react';
import Link from 'next/link';

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
      className="btn flex h-48 w-96 flex-col space-y-2 rounded-md bg-base-300 text-base-content shadow-md"
    >
      <div className="card-body">
        <div className="flex h-full w-full flex-col">
          {/* title */}
          <div>
            <h1 className={`text-xl font-bold `}>{boardData.title}</h1>
          </div>

          {/* number of columns */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700">
              Columns: {boardData.columns.length}
            </span>
          </div>

          {/* last updated */}
          {boardData.$updatedAt && (
            <div>
              <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 ">
                Last Updated: {new Date(boardData.$updatedAt).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
