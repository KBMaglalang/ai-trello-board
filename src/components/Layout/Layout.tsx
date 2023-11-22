import React from "react";

// components
// import Header from "../Header/Header";
import { Header } from "../Header";
// import Modal from "../Card/Modal";
import { Modal } from "../Card";

export function Layout({ children }: any) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      {children}
      <Modal />
    </div>
  );
}
