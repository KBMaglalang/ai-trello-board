"use client";

import React, { useState, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import {
  PlusCircleIcon,
  PencilIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

// components
import Card from "./Card";

// store
import { useModalStore } from "@/store/ModalStore";
import { useNewBoardStore } from "@/store/NewBoardStore";

// constants and functions
import { updateColumn, deleteColumn } from "@/lib/appwrite/columns";
import { openTaskModal } from "@/lib/util";

type Props = {
  columnData: any;
  index: number;
};

export default function Column({ columnData, index }: Props) {
  const [openModal] = useModalStore((state) => [state.openModal]);
  const [workingColumn, setWorkingColumn, getBoardList] = useNewBoardStore(
    (state) => [state.workingColumn, state.setWorkingColumn, state.getBoardList]
  );

  const [isEditable, setIsEditable] = useState(false);
  const [columnTitle, setColumnTitle] = useState(
    columnData?.title || "New Column"
  );

  const handleEditColumnName = async () => {
    // update column title in the database
    if (isEditable) {
      await updateColumn(columnData?.$id, columnTitle);
    }

    setIsEditable(!isEditable);

    await getBoardList();
  };

  const handleDeleteColumn = async () => {
    deleteColumn(columnData?.$id);

    await getBoardList();
  };

  const handleAddTodo = () => {
    // set the workingColumn in the board store
    setWorkingColumn(columnData);

    openTaskModal();
    // openModal();
  };

  return (
    <Draggable draggableId={columnData?.$id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm w-96  `}
              >
                {/* column title */}
                <div className="flex flex-row pb-2 justify-between items-center text-base-content space-x-2">
                  <input
                    className={`text-xl font-bold bg-transparent ${
                      isEditable
                        ? "outline-2"
                        : "cursor-pointer input-disabled focus:ring-0 focus:ring-offset-0 outline-none"
                    }`}
                    value={columnTitle}
                    readOnly={!isEditable}
                    onChange={(e) => setColumnTitle(e.target.value)}
                  />

                  <div className="flex space-x-2 text-base-content items-center">
                    <PencilIcon
                      className={`w-6 h-6 hover:text-blue-500 ${
                        isEditable ? "text-blue-600" : ""
                      }`}
                      onClick={handleEditColumnName}
                    />

                    <XCircleIcon
                      className="w-6 h-6 ml-2 hover:text-red-500"
                      onClick={handleDeleteColumn}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {/* list todo cards */}
                  {columnData &&
                    columnData?.todos.map((todo, index) => {
                      return (
                        <Draggable
                          key={todo.$id}
                          draggableId={todo.$id}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              todo={todo}
                              index={index}
                              id={columnData?.$id}
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
                    <button
                      onClick={handleAddTodo}
                      className="btn btn-primary w-full "
                    >
                      <PlusCircleIcon className="w-8 h-8" />
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
