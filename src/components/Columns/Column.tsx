'use client';

import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { PlusCircleIcon, PencilIcon, XCircleIcon } from '@heroicons/react/24/solid';

// components
import { Card } from '../Card';

// store
import { useBoardStateStore } from '@/store/BoardStateStore';

// constants and functions
import { deleteColumn } from '@/lib/appwrite/columns';
import { openTaskModal, updateColumnTitle, deleteColumnFromBoard } from '@/lib/util';

type Props = {
  columnData: any;
  index: number;
};

export function Column({ columnData, index }: Props) {
  const [setWorkingColumn, workingBoard, setBoardList, setWorkingBoard, boardList] =
    useBoardStateStore((state) => [
      state.setWorkingColumn,
      state.workingBoard,
      state.setBoardList,
      state.setWorkingBoard,
      state.boardList,
    ]);

  const [isEditable, setIsEditable] = useState(false);
  const [columnTitle, setColumnTitle] = useState(columnData?.title || 'New Column');

  /**

  Handles the editing of a column's name.
  @returns {void} */
  const handleEditColumnName = async () => {
    // update column title in the database
    if (isEditable) {
      const newColumn = await updateColumnTitle(columnData?.$id, columnTitle);

      // update the column in the working board
      const newColumnList = workingBoard.columns.map((column: any) => {
        if (column.$id === newColumn.$id) {
          return newColumn;
        }

        return column;
      });

      const newBoard = { ...workingBoard, columns: newColumnList };

      const newBoardList = boardList.map((board) => {
        if (board.$id === newBoard.$id) {
          return newBoard;
        }

        return board;
      });

      setBoardList(newBoardList);
      setWorkingBoard(newBoard);
    }

    setIsEditable(!isEditable);
  };

  /**

  Handles the deletion of a column from the board.
  @returns {void} */
  const handleDeleteColumn = async () => {
    const newBoard = await deleteColumnFromBoard(workingBoard, columnData);
    await deleteColumn(columnData?.$id);

    // update the boardList locally
    const newBoardList = boardList.map((board) => {
      if (board.$id === newBoard.$id) {
        return newBoard;
      }

      return board;
    });

    setWorkingBoard(newBoard);
    setBoardList(newBoardList);
  };

  /**

  Handles the addition of a new todo.
  @returns {void} */
  const handleAddTodo = () => {
    // set the workingColumn in the board store
    setWorkingColumn(columnData);

    openTaskModal();
  };

  return (
    <Draggable draggableId={columnData?.$id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Droppable droppableId={columnData?.$id} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`w-96 rounded-2xl p-2 shadow-sm  `}
              >
                {/* column title */}
                <div className="flex flex-row items-center justify-between space-x-2 pb-2 text-base-content">
                  <input
                    className={`bg-transparent text-xl font-bold ${
                      isEditable
                        ? 'outline-2'
                        : 'input-disabled cursor-pointer outline-none focus:ring-0 focus:ring-offset-0'
                    }`}
                    value={columnTitle}
                    readOnly={!isEditable}
                    onChange={(e) => setColumnTitle(e.target.value)}
                  />

                  <div className="flex items-center space-x-2 text-base-content">
                    <PencilIcon
                      className={`h-6 w-6 hover:text-blue-500 ${isEditable ? 'text-blue-600' : ''}`}
                      onClick={handleEditColumnName}
                    />

                    <XCircleIcon
                      className="ml-2 h-6 w-6 hover:text-red-500"
                      onClick={handleDeleteColumn}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {/* list todo cards */}
                  {columnData &&
                    columnData?.todos.map((todo: any, index: number) => {
                      return (
                        <Draggable key={todo.$id} draggableId={todo.$id} index={index}>
                          {(provided) => (
                            <Card
                              todo={todo}
                              index={index}
                              columnData={columnData}
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}

                  {/* add new todo button */}
                  <div className="flex items-end justify-end ">
                    <button onClick={handleAddTodo} className="btn btn-primary w-full ">
                      <PlusCircleIcon className="h-8 w-8" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
