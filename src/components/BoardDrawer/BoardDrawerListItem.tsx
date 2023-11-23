"use client";

import React, { useState } from "react";
import { XCircleIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

// components

// store
import { useBoardStateStore } from "@/store/BoardStateStore";

// constants and functions
import { deleteBoard } from "@/lib/appwrite/boards";
import { updateBoardTitle } from "@/lib/util";

type Props = {
  boardData: any;
};

export default function BoardDrawerListItem({ boardData }: Props) {
  const router = useRouter();
  const [boardTitle, setBoardTitle] = useState(boardData?.title || "New Board");
  const [isEditable, setIsEditable] = useState(false);

  const [setWorkingBoard, boardList, setBoardList] = useBoardStateStore(
    (state) => [state.setWorkingBoard, state.boardList, state.setBoardList]
  );

  /**

  Handler function that sets the working board to the selected board and navigates to the board page.
  @returns {void} */
  const handleOnClicked = () => {
    if (!isEditable) {
      // set the working boarde to the selected board
      setWorkingBoard(boardData);

      // go to board page
      router.push(`/board/${boardData.$id}`);
    }
  };

  /**

  Handler function that edits a board item's title and updates it in the boardList.
  @param {React.MouseEvent<SVGSVGElement, MouseEvent>} e - The mouse event triggering the editing.
  @returns {Promise<void>} */
  const handleEditBoardItem = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    // update board title
    if (isEditable) {
      const newBoard = await updateBoardTitle(boardData?.$id, boardTitle);

      // update the boardList locally
      const newBoardList = boardList.map((board) => {
        if (board.$id === newBoard.$id) {
          return newBoard;
        }

        return board;
      });

      setBoardList(newBoardList);
    }

    setIsEditable(!isEditable);
  };

  /**

  Handler function that deletes a board item and removes it from the boardList.
  @param {React.MouseEvent<SVGSVGElement, MouseEvent>} e - The mouse event triggering the deletion.
  @returns {Promise<void>} */
  const handleDeleteBoardItem = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();

    await deleteBoard(boardData?.$id);

    // remove board from the boardList
    const newBoard = boardList.filter((board) => board.$id !== boardData.$id);
    setBoardList(newBoard);
  };

  return (
    <div className="flex flex-row space-x-2 w-full" onClick={handleOnClicked}>
      <div className={`btn btn-ghost flex-1 text-base-content`}>
        <input
          className={`p-2 text-md bg-transparent w-full ${
            isEditable
              ? "outline-2"
              : "cursor-pointer input-disabled focus:ring-0 focus:ring-offset-0 outline-none"
          }`}
          value={boardTitle}
          readOnly={!isEditable}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
      </div>

      <div className="flex space-x-2 text-base-content items-center">
        <PencilIcon
          className={`w-6 h-6 hover:text-blue-500 ${
            isEditable ? "text-blue-500" : ""
          }`}
          onClick={(e) => handleEditBoardItem(e)}
        />
        <XCircleIcon
          className="w-6 h-6 hover:text-red-500"
          onClick={handleDeleteBoardItem}
        />
      </div>
    </div>
  );
}
