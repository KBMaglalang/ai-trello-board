import React from "react";

// components
import Board from "@/components/features/Board";

type Props = {
  params: {
    id: string;
  };
};

export default function page({ params: { id } }: Props) {
  return (
    <main className="flex flex-row flex-1 p-5 w-full h-full">
      <Board id={id} />
    </main>
  );
}
