"use client";

import React, { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import Image from "next/image";
import { XCircleIcon, PencilIcon } from "@heroicons/react/24/solid";

// components

// stores
import { useModalStore } from "@/store/ModalStore";
import { useBoardStateStore } from "@/store/BoardStateStore";
import { useResponseDrawerStore } from "@/store/ResponseDrawerStore";

// constants and functions
import { getUrl } from "@/lib/util";
import { getSubTasks } from "@/lib/ai";
import { deleteCard } from "@/lib/appwrite/cards";
import {
  deleteCardFromColumn,
  openTaskModal,
  updateCardComplete,
} from "@/lib/util";

type Props = {
  todo: Card;
  index: number;
  columnData: any;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export function Card({
  todo,
  index,
  columnData,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const [isCompleted, setIsCompleted] = useState(todo?.completed || false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // stores
  const [openModal, isOpen, isEditModal] = useModalStore((state) => [
    state.openModal,
    state.isOpen,
    state.isEditModal,
  ]);
  const [workingBoard, setWorkingBoard] = useBoardStateStore((state) => [
    state.workingBoard,
    state.setWorkingBoard,
  ]);
  const [
    openResponseDrawer,
    setResponseBreakdown,
    setResponseLoading,
    clearResponseLoading,
  ] = useResponseDrawerStore((state) => [
    state.openResponseDrawer,
    state.setResponseBreakdown,
    state.setResponseLoading,
    state.clearResponseLoading,
  ]);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage();
    }
  }, [todo]);

  const handleCardCompletedToggle = async () => {
    await updateCardComplete(todo.$id, !isCompleted);
    setIsCompleted(!isCompleted);
  };

  const handleDeleteCard = async () => {
    // delete the card from the local column (todo and teh order position)
    const newColumnData = {
      ...columnData,
      todos: columnData.todos.filter((t: any) => t.$id !== todo.$id),
      order: columnData.order.filter((id: string) => id !== todo.$id),
    };

    // update the column of local workingBoard
    const newWorkingBoard = {
      ...workingBoard,
      columns: workingBoard.columns.map((c: any) =>
        c.$id === columnData.$id ? newColumnData : c
      ),
    };
    setWorkingBoard(newWorkingBoard);

    // update the database with teh new column information
    await deleteCardFromColumn(columnData, newColumnData);

    // delete the card from teh database
    await deleteCard(todo.$id);
  };

  const handleModal = () => {
    openTaskModal();
    openModal(true, todo, columnData.$id);
  };

  const handleGetSubTasks = async () => {
    setResponseLoading(true);
    const response = await getSubTasks(todo);
    clearResponseLoading();
    setResponseBreakdown(response.split("\n"));
    openResponseDrawer();
  };

  return (
    <div
      className={`flex flex-col space-y-2 bg-base-300 text-base-content rounded-md  w-full shadow-md`}
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      onDoubleClick={handleModal}
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div>
            <input
              type="checkbox"
              checked={isCompleted}
              className="checkbox checkbox-sm"
              onChange={handleCardCompletedToggle}
            />
          </div>

          <div>
            <button
              className="btn btn-outline btn-xs"
              onClick={handleGetSubTasks}
            >
              Breakdown Task
            </button>
          </div>

          <div className="flex flex-row space-x-2">
            <button
              onClick={handleModal}
              className="text-base-content hover:text-blue-500"
            >
              <PencilIcon className="w-6 h-6" />
            </button>

            <button
              onClick={handleDeleteCard}
              className="text-base-content hover:text-red-500"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* title */}
        <div className="flex flex-row">
          <h1 className={`text-xl font-bold`}>{todo.title}</h1>
        </div>

        {/* image */}
        {/* {imageUrl && (
          <div className="relative w-full h-full rounded-b-md">
            <Image
              src={imageUrl}
              alt="Task image"
              width={400}
              height={200}
              className="object-contain w-full rounded-b-md"
            />
          </div>
        )} */}

        {/* start and due date indicators */}
        <div className="flex flex-row w-full justify-between">
          {/* start date */}
          {todo.startDate && (
            <div className="flex items-center justify-end ">
              <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md">
                Start: {new Date(todo.startDate).toLocaleDateString()}
              </span>
            </div>
          )}

          {/* end date */}
          {todo.endDate && (
            <div className="flex items-center justify-end">
              <span className="px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-md">
                Due: {new Date(todo.endDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
