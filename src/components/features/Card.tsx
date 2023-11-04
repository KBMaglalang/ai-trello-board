"use client";

import React, { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import Image from "next/image";
import { XCircleIcon, PencilIcon } from "@heroicons/react/24/solid";

import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export default function Card({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // stores
  const [openModal, isOpen, isEditModal] = useModalStore((state) => [
    state.openModal,
    state.isOpen,
    state.isEditModal,
  ]);
  const deleteTask = useBoardStore((state) => state.deleteTask);

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

  return (
    <div
      className="space-y-2 bg-white rounded-md drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      onDoubleClick={() => openModal(true, todo, id)}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-end mt-4 mr-4">
          <button
            onClick={() => openModal(true, todo, id)}
            className="text-gray-200 hover:text-blue-600"
          >
            <PencilIcon className="w-6 h-6" />
          </button>

          <button
            onClick={() => deleteTask(index, todo, id)}
            className="text-gray-200 hover:text-red-600"
          >
            <XCircleIcon className="w-6 h-6 ml-2" />
          </button>
        </div>

        {/* title */}
        <div className="flex items-center justify-between p-5">
          <p className="text-xl font-bold">{todo.title}</p>
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

        {/* created at */}
        <div className="">
          <p className="text-xs text-gray-400 text-end pr-4 pb-4">
            {new Date(todo.$createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
