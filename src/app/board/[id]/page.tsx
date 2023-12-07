import React from 'react';

// components
import { Board } from '@/components/Board';

type Props = {
  params: {
    id: string;
  };
};

export default function page({ params: { id } }: Props) {
  return (
    <main className="flex h-full w-full flex-1 flex-row py-5">
      <Board id={id} />
    </main>
  );
}
