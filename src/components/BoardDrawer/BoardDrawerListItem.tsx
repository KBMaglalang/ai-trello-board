'use client';

import React, { useState } from 'react';
import { XCircleIcon, PencilIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

// components

// store
import { useBoardStateStore } from '@/store/BoardStateStore';

// constants and functions
import { deleteBoard } from '@/lib/appwrite/boards';
import { updateBoardTitle } from '@/lib/util';

type Props = {
  boardData: any;
};

export default function BoardDrawerListItem({ boardData }: Props) {
  const router = useRouter();
  const [boardTitle, setBoardTitle] = useState(boardData?.title || 'New Board');
  const [isEditable, setIsEditable] = useState(false);

  const [setWorkingBoard, boardList, setBoardList] = useBoardStateStore((state) => [
    state.setWorkingBoard,
    state.boardList,
    state.setBoardList,
  ]);

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
  const handleEditBoardItem = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
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
  const handleDeleteBoardItem = async (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();

    await deleteBoard(boardData?.$id);

    // remove board from the boardList
    const newBoard = boardList.filter((board) => board.$id !== boardData.$id);
    setBoardList(newBoard);
  };

  return (
    <div className="flex w-full flex-row space-x-2" onClick={handleOnClicked}>
      <div className={`btn btn-ghost flex-1 text-base-content`}>
        <input
          className={`text-md w-full bg-transparent p-2 ${
            isEditable
              ? 'outline-2'
              : 'input-disabled cursor-pointer outline-none focus:ring-0 focus:ring-offset-0'
          }`}
          value={boardTitle}
          readOnly={!isEditable}
          onChange={(e) => setBoardTitle(e.target.value)}
        />
      </div>

      <div className="flex items-center space-x-2 text-base-content">
        <PencilIcon
          className={`h-6 w-6 hover:text-blue-500 ${isEditable ? 'text-blue-500' : ''}`}
          onClick={(e) => handleEditBoardItem(e)}
        />
        <XCircleIcon className="h-6 w-6 hover:text-red-500" onClick={handleDeleteBoardItem} />
      </div>
    </div>
  );
}
