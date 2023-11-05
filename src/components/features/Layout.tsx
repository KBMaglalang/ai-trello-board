import React from "react";

// components
import Header from "./Header";
import Modal from "./Modal";
import BoardDrawer from "./BoardDrawer";

export default function Layout({ children }: any) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <BoardDrawer />
      {children}
      <Modal />
    </div>
  );
}
