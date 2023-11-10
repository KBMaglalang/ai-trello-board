import React, { useEffect } from "react";

// components

// store
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

// constants and functions

export default function TaskPriorityGroup() {
  const [isEditModal, cardInfo] = useModalStore((state) => [
    // states
    state.isEditModal,
    state.cardInfo,
  ]);
  const [newTaskPriority, setNewTaskPriority] = useBoardStore((state) => [
    state.newTaskPriority,
    state.setNewTaskPriority,
  ]);

  useEffect(() => {
    if (isEditModal) {
      setNewTaskPriority(cardInfo?.todo?.priority);
    }
  }, [isEditModal, cardInfo?.todo?.priority, setNewTaskPriority]);

  const handleSelect = (e: any) => {
    const value = e.target.value.toLowerCase();

    // check for null
    if (value === null) {
      setNewTaskPriority(value);
      return;
    }

    // for strings
    setNewTaskPriority(value.toLowerCase() as PriorityStatus);
  };

  return (
    <select
      className="select select-bordered w-full border-gray-300 rounded-md mt-2"
      onChange={handleSelect}
      value={
        !newTaskPriority
          ? "Select a Task Priority"
          : newTaskPriority[0].toUpperCase() + newTaskPriority.slice(1)
      }
    >
      <option disabled>Select a Task Priority</option>
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>
  );
}
