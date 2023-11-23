import React, { useEffect } from "react";

// components

// store
import { useBoardStateStore } from "@/store/BoardStateStore";
import { useModalStore } from "@/store/ModalStore";

// constants and functions

export default function TaskDatePicker() {
  const [isEditModal, cardInfo] = useModalStore((state) => [
    // states
    state.isEditModal,
    state.cardInfo,
  ]);

  const [cardStartDate, setStartDate, cardEndDate, setEndDate] =
    useBoardStateStore((state) => [
      state.cardStartDate,
      state.setCardStartDate,
      state.cardEndDate,
      state.setCardEndDate,
    ]);

  /**

  Sets the start and end dates when the edit modal is active.
  @param {boolean} isEditModal - Boolean flag indicating whether the edit modal is active.
  @param {string | undefined} cardInfo?.todo?.startDate - The start date of the task from the cardInfo object.
  @param {string | undefined} cardInfo?.todo?.endDate - The end date of the task from the cardInfo object.
  @param {function} setStartDate - The function to set the task start date.
  @param {function} setEndDate - The function to set the task end date.
  @returns {void} */
  useEffect(() => {
    if (isEditModal) {
      setStartDate(cardInfo?.todo?.startDate);
      setEndDate(cardInfo?.todo?.endDate);
    }
  }, [
    isEditModal,
    cardInfo?.todo?.startDate,
    cardInfo?.todo?.endDate,
    setStartDate,
    setEndDate,
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
          value={cardStartDate}
          onChange={(e) => setStartDate(e.target.value)}
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
          value={cardEndDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>
  );
}
