"use client";

import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

// components
import Card from "./Card";

// store
import { useModalStore } from "@/store/ModalStore";

// constants and functions

type Props = {
  columnData: any;
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

export default function Column({ columnData, index }: Props) {
  const openModal = useModalStore((state) => state.openModal);

  const handleAddTodo = () => {
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
                <h2 className="flex justify-between p-2 text-xl font-bold">
                  {columnData?.title}
                </h2>

                <div className="space-y-2">
                  {/* list todo cards */}
                  {columnData?.todos.map((todo, index) => {
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
                            id={columnData?.id}
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
