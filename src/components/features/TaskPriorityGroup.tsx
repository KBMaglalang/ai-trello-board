import React, { useEffect } from "react";

// components

// store
import { useModalStore } from "@/store/ModalStore";
import { BoardStateStore } from "@/store/BoardStateStore";

// constants and functions

export default function TaskPriorityGroup() {
  const [isEditModal, cardInfo] = useModalStore((state) => [
    // states
    state.isEditModal,
    state.cardInfo,
  ]);
  const [taskPriority, setTaskPriority] = BoardStateStore((state) => [
    state.cardPriority,
    state.setTaskPriority,
  ]);

  useEffect(() => {
    if (isEditModal) {
      setTaskPriority(cardInfo?.todo?.priority);
    }
  }, [isEditModal, cardInfo?.todo?.priority, setTaskPriority]);

  const handleSelect = (e: any) => {
    const value = e.target.value.toLowerCase();

    // check for null
    if (value === null) {
      setTaskPriority(value);
      return;
    }

    // for strings
    setTaskPriority(value.toLowerCase());
  };

  return (
    <select
      className="select select-bordered w-full border-gray-300 rounded-md mt-2"
      onChange={handleSelect}
      value={
        !taskPriority
          ? "Task Priority"
          : taskPriority[0].toUpperCase() + taskPriority.slice(1)
      }
    >
      <option disabled>Task Priority</option>
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>
  );
}
