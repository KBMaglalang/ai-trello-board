import React from "react";

// components
import Header from "./Header";

export default function Layout({ children }: any) {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      {children}
    </div>
  );
}
