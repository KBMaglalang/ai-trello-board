import React, { useEffect } from "react";

// components

// store
import { useBoardStore } from "@/store/BoardStore"; // TODO: update to use the new board store
import { useModalStore } from "@/store/ModalStore";

// constants and functions

export default function TaskDatePicker() {
  const [isEditModal, cardInfo] = useModalStore((state) => [
    // states
    state.isEditModal,
    state.cardInfo,
  ]);
  const [
    newTaskStartDate,
    newTaskEndDate,
    setNewTaskStartDate,
    setNewTaskEndDate,
  ] = useBoardStore((state) => [
    state.newTaskStartDate,
    state.newTaskEndDate,

    state.setNewTaskStartDate,
    state.setNewTaskEndDate,
  ]);

  useEffect(() => {
    if (isEditModal) {
      setNewTaskStartDate(cardInfo?.todo?.startDate);
      setNewTaskEndDate(cardInfo?.todo?.endDate);
    }
  }, [
    isEditModal,
    cardInfo?.todo?.startDate,
    cardInfo?.todo?.endDate,
    setNewTaskStartDate,
    setNewTaskEndDate,
  ]);

  return (
    <div className="flex flex-col mt-2 space-y-2 w-full">
      {/* start date input */}
      <div className="w-full form-control">
        <label className="label">
          <span className="label-text">Start Date</span>
        </label>
        <input
          type="datetime-local"
          name="startDate"
          className="input input-bordered w-full"
          value={newTaskStartDate}
          onChange={(e) => setNewTaskStartDate(e.target.value)}
        />
      </div>

      {/* end date input */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">End Date</span>
        </label>
        <input
          type="datetime-local"
          name="endDate"
          className="input input-bordered w-full"
          value={newTaskEndDate}
          onChange={(e) => setNewTaskEndDate(e.target.value)}
        />
      </div>
    </div>
  );
}
