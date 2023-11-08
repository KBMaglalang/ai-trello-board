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

    openModal();
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
                className={`pb-2 bg-white/50 p-2 rounded-2xl shadow-sm
                `}
              >
                {/* column title */}
                <div className="flex flex-row">
                  <input
                    className={`flex justify-between p-2 text-xl font-bold bg-transparent ${
                      isEditable ? "" : "input-disabled"
                    }`}
                    value={columnTitle}
                    readOnly={!isEditable}
                    onChange={(e) => setColumnTitle(e.target.value)}
                  />
                  <button
                    className="text-gray-200 hover:text-blue-600"
                    onClick={handleEditColumnName}
                  >
                    <PencilIcon
                      className={`w-6 h-6 ${isEditable ? "text-blue-600" : ""}`}
                    />
                  </button>

                  <button
                    className="text-gray-200 hover:text-red-600"
                    onClick={handleDeleteColumn}
                  >
                    <XCircleIcon className="w-6 h-6 ml-2" />
                  </button>
                </div>

                <div className="space-y-2">
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
                  <div className="flex items-end justify-end p-2">
                    <button
                      onClick={handleAddTodo}
                      className="btn glass w-full text-gray-700"
                    >
                      <PlusCircleIcon className="w-10 h-10" />
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
