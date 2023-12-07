'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// components

// store
import { useBoardStateStore } from '@/store/BoardStateStore';

// functions and constants

export default function HeaderBoard() {
  const pathname = usePathname();
  const [workingBoard, clearWorkingBoard] = useBoardStateStore((state) => [
    state.workingBoard,
    state.clearWorkingBoard,
  ]);

  useEffect(() => {
    if (pathname === '/') {
      clearWorkingBoard();
    }
  }, [pathname, clearWorkingBoard]);

  return (
    <nav className="flex flex-wrap items-center justify-center text-base-content md:mx-auto">
      <div className="text-md flex font-bold text-base-content">
        {workingBoard && <h1>{workingBoard.title}</h1>}
      </div>
    </nav>
  );
}
