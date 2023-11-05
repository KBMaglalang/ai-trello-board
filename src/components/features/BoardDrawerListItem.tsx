import React from "react";
import { XCircleIcon, PencilIcon } from "@heroicons/react/24/solid";

type Props = {
  title: string;
  id: string;
};

export default function BoardDrawerListItem({ title, id }: Props) {
  const handleEditBoardItem = () => {};
  const handleDeleteBoardItem = () => {};

  return (
    <a href={`/board/${id}`} className="flex flex-row btn primary">
      <span className="flex-1">{title}</span>
      <PencilIcon className="w-4 h-4 ml-2" />
      <XCircleIcon className="w-4 h-4 ml-2" />
    </a>
  );
}
