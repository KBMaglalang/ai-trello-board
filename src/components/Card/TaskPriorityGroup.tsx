import React, { useEffect } from 'react';

// components

// store
import { useModalStore } from '@/store/ModalStore';
import { useBoardStateStore } from '@/store/BoardStateStore';

// constants and functions

export default function TaskPriorityGroup() {
  const [isEditModal, cardInfo] = useModalStore((state) => [
    // states
    state.isEditModal,
    state.cardInfo,
  ]);
  const [taskPriority, setTaskPriority] = useBoardStateStore((state) => [
    state.cardPriority,
    state.setTaskPriority,
  ]);

  /**

  Sets the task priority when the edit modal is active.
  @param {boolean} isEditModal - Boolean flag indicating whether the edit modal is active.
  @param {string | undefined} cardInfo?.todo?.priority - The priority of the task from the cardInfo object.
  @param {function} setTaskPriority - The function to set the task priority.
  @returns {void} */
  useEffect(() => {
    if (isEditModal) {
      setTaskPriority(cardInfo?.todo?.priority);
    }
  }, [isEditModal, cardInfo?.todo?.priority, setTaskPriority]);

  /**

  Handles the selection of a task priority.
  @param {Event} e - The event object representing the select element.
  @returns {void} */
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
      className="select select-bordered mt-2 w-full rounded-md border-gray-300"
      onChange={handleSelect}
      value={
        !taskPriority ? 'Task Priority' : taskPriority[0].toUpperCase() + taskPriority.slice(1)
      }
    >
      <option disabled>Task Priority</option>
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>
  );
}
