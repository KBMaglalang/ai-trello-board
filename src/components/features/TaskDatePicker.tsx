import React, { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

export default function TaskDatePicker() {
  const [isEditModal, cardInfo] = useModalStore((state) => [
    // states
    state.isEditModal,
    state.cardInfo,
  ]);
  const [setNewTaskStartDate, setNewTaskEndDate] = useBoardStore((state) => [
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

  // todo refator - this should be change to completely rely on the store and not on the state
  const [startDate, setStartDate] = useState({
    startDate: cardInfo?.todo?.startDate || new Date(),
    endDate: cardInfo?.todo?.startDate || null,
  });

  const [endDate, setEndDate] = useState({
    startDate: cardInfo?.todo?.endDate || new Date(),
    endDate: cardInfo?.todo?.endDate || null,
  });

  const handleStartDateChange = (newValue: any) => {
    setStartDate(newValue);
    setNewTaskStartDate(newValue.startDate);
  };

  const handleEndDateChange = (newValue: any) => {
    setEndDate(newValue);
    setNewTaskEndDate(newValue.startDate);
  };

  return (
    <div className="flex flex-col mt-2 space-y-2 w-full">
      <div className="flex flex-row w-full">
        <Datepicker
          primaryColor={"blue"}
          value={startDate}
          useRange={false}
          asSingle={true}
          placeholder={"Start Date"}
          onChange={handleStartDateChange}
        />
      </div>
      <div className="flex flex-row w-full">
        <Datepicker
          primaryColor={"blue"}
          value={endDate}
          useRange={false}
          asSingle={true}
          placeholder={"End Date"}
          onChange={handleEndDateChange}
        />
      </div>
    </div>
  );
}
