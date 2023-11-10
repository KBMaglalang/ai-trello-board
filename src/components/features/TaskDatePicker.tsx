import React, { useEffect } from "react";

// components

// store
import { useNewBoardStore } from "@/store/NewBoardStore";
import { useModalStore } from "@/store/ModalStore";

// constants and functions

export default function TaskDatePicker() {
  const [isEditModal, cardInfo] = useModalStore((state) => [
    // states
    state.isEditModal,
    state.cardInfo,
  ]);

  const [cardStartDate, setStartDate, cardEndDate, setEndDate] =
    useNewBoardStore((state) => [
      state.cardStartDate,
      state.setCardStartDate,
      state.cardEndDate,
      state.setCardEndDate,
    ]);

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
