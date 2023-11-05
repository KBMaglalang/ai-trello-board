import React from "react";

// components
import BoardDrawerListItem from "./BoardDrawerListItem";

const TEMP_DATA = [
  {
    title: "Board 1",
    id: "1",
  },
  {
    title: "Board 2",
    id: "2",
  },
  {
    title: "Board 3",
    id: "3",
  },
  // generate 10 more
  ...Array.from(Array(30).keys()).map((item) => ({
    title: `Board ${item + 4}`,
    id: `${item + 4}`,
  })),
];

export default function BoardDrawerList() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden h-full overflow-y-scroll">
      {/* Sidebar content here */}
      {TEMP_DATA.map((item, index) => (
        <BoardDrawerListItem key={index} title={item.title} id={item.id} />
      ))}
    </div>
  );
}
