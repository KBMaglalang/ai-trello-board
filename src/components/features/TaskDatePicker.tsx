import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import { useBoardStore } from "@/store/BoardStore";

export default function TaskDatePicker() {
  const [setNewTaskStartDate, setNewTaskEndDate] = useBoardStore((state) => [
    state.setNewTaskStartDate,
    state.setNewTaskEndDate,
  ]);

  const [startDate, setStartDate] = useState({
    startDate: new Date(),
    endDate: null,
  });
  const [endDate, setEndDate] = useState({
    startDate: new Date(),
    endDate: null,
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
