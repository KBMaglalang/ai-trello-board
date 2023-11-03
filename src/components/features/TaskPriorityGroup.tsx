import React from "react";

import { useBoardStore } from "@/store/BoardStore";

export default function TaskPriorityGroup() {
  const [newTaskPriority, setNewTaskPriority] = useBoardStore((state) => [
    state.newTaskPriority,
    state.setNewTaskPriority,
  ]);

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
    >
      <option disabled selected>
        Select a Task Priority
      </option>
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>
  );
}
