"use client";
1;
import React, { useState, useEffect } from "react";
import { XCircleIcon, PencilIcon } from "@heroicons/react/24/solid";

// components

// store

// constants and functions
import { deleteBoard, updateBoard } from "@/lib/appwrite/boards";

type Props = {
  title: string;
  id: string;
};

export default function BoardDrawerListItem({ title, id }: Props) {
  const [boardTitle, setBoardTitle] = useState(title);
  const [isEditable, setIsEditable] = useState(false);

  const handleEditBoardItem = () => {
    setIsEditable(!isEditable);

    // update board title
    if (!isEditable) {
      updateBoard(id, boardTitle);
    }
  };

  const handleDeleteBoardItem = () => {
    deleteBoard(id);
  };

  return (
    <div className="flex flex-row space-x-2  primary w-full">
      <input
        className={`bg-transparent ${isEditable ? "" : "input-disabled"}}`}
        value={boardTitle}
        readOnly={!isEditable}
        onChange={(e) => setBoardTitle(e.target.value)}
      />

      <PencilIcon
        className={`w-4 h-4 hover:text-white ${
          isEditable ? "text-cyan-500" : ""
        }`}
        onClick={handleEditBoardItem}
      />
      <XCircleIcon
        className="w-4 h-4 hover:text-red-500"
        onClick={handleDeleteBoardItem}
      />
    </div>
  );
}
