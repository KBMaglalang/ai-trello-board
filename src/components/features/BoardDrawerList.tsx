"use client";

import React, { useState, useEffect } from "react";

// components
import BoardDrawerListItem from "./BoardDrawerListItem";

// store

// constants and functions
import { getBoards } from "@/lib/appwrite/boards";

export default function BoardDrawerList() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const getBoardData = async () => {
      const boards = await getBoards();
      setBoards(boards);
    };

    getBoardData().catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex flex-1 flex-col overflow-hidden h-full overflow-y-scroll">
      {/* Sidebar content here */}
      {boards.map((item, index) => (
        <BoardDrawerListItem key={index} title={item.title} id={item.$id} />
      ))}
    </div>
  );
}
