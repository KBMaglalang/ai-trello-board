"use client";

import React, { useState, useEffect } from "react";
import { XCircleIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

// components

// store
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

  const [setWorkingBoard, getBoardList] = useNewBoardStore((state) => [
    state.setWorkingBoard,
    state.getBoardList,
  ]);

  const handleOnClicked = () => {
    if (!isEditable) {
      // set the working boarde to the selected board
      setWorkingBoard(boardData);

      // go to board page
      router.push(`/board/${boardData.$id}`);
    }
  };

  const handleEditBoardItem = async () => {
    // update board title
    if (isEditable) {
      await updateBoard(boardData?.$id, boardTitle);
    }

    setIsEditable(!isEditable);

    // update the boardList
    await getBoardList();
  };

  const handleDeleteBoardItem = async () => {
    await deleteBoard(boardData?.$id);

    // update the boardList
    await getBoardList();
  };

  return (
    <div className="flex flex-row space-x-2 w-full" onClick={handleOnClicked}>
      <div className="btn btn-ghost flex-1">
        <input
          className={`text-md bg-transparent ${
            isEditable ? "" : "cursor-pointer input-disabled"
          } w-full focus:ring-0 focus:ring-offset-0 outline-none`}
          value={boardTitle}
          readOnly={!isEditable}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
      </div>

      <div className="flex space-x-2">
        <PencilIcon
          className={`btn btn-square w-6 h-6 hover:text-blue-500 ${
            isEditable ? "text-blue-500" : ""
          }`}
          onClick={handleEditBoardItem}
        />
        <XCircleIcon
          className="btn btn-circle w-6 h-6 hover:text-red-500"
          onClick={handleDeleteBoardItem}
        />
      </div>
    </div>
  );
}
