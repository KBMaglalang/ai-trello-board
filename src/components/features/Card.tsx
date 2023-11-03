"use client";

import React, { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/solid";

import getUrl from "@/lib/getUrl";
import { useBoardStore } from "@/store/BoardStore";

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
    >
      <div className="flex flex-col">
        {/* title */}
        <div className="flex items-center justify-between p-5">
          <p>{todo.title}</p>
          <button
            onClick={() => deleteTask(index, todo, id)}
            className="text-red-500 hover:text-red-600"
          >
            <XCircleIcon className="w-8 h-8 ml-5" />
          </button>
        </div>

        {/* image */}
        {imageUrl && (
          <div className="relative w-full h-full rounded-b-md">
            <Image
              src={imageUrl}
              alt="Task image"
              width={400}
              height={200}
              className="object-contain w-full rounded-b-md"
            />
          </div>
        )}

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
