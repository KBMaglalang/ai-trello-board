"use client";

import React, { useState, useEffect } from "react";
import { XCircleIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

// components

// store
import { useDrawerStore } from "@/store/DrawerStore";
import { useNewBoardStore } from "@/store/NewBoardStore";

// constants and functions
import { deleteBoard, updateBoard } from "@/lib/appwrite/boards";

type Props = {
  boardData: any;
};

export default function BoardDrawerListItem({ boardData }: Props) {
  const router = useRouter();
  const [boardTitle, setBoardTitle] = useState(boardData?.title || "New Board");
  const [isEditable, setIsEditable] = useState(false);
  const [closeDrawer] = useDrawerStore((state) => [state.closeDrawer]);
  const [setWorkingBoard] = useNewBoardStore((state) => [
    state.setWorkingBoard,
  ]);

  const handleOnClicked = () => {
    // set the working boarde to the selected board
    setWorkingBoard(boardData);

    // close drawer
    closeDrawer();

    // go to board page
    router.push(`/board/${boardData.$id}`);
  };

  const handleEditBoardItem = () => {
    // update board title
    if (isEditable) {
      updateBoard(boardData?.$id, boardTitle);
    }

    setIsEditable(!isEditable);
  };

  const handleDeleteBoardItem = () => {
    deleteBoard(boardData?.$id);
  };

  return (
    <div className="flex flex-row space-x-2 w-full" onClick={handleOnClicked}>
      <input
        className={`bg-transparent ${isEditable ? "" : "input-disabled"}`}
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
