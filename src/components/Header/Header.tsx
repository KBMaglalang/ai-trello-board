import React from 'react';
import Link from 'next/link';

// components
import { BoardDrawer } from '../BoardDrawer';
import ThemeToggle from './ThemeToggle';
import HeaderBoard from './HeaderBoard';
import { ResponseDrawer } from '../ResponseDrawer';

// store

// constants and functions
import { PROJECT_NAME } from '@/constants';

export function Header() {
  return (
    <header className="body-font text-base-content">
      <div className="mx-auto flex flex-col flex-wrap items-center px-5 py-2 md:flex-row">
        <div className="flex w-full justify-between space-x-2 md:w-0">
          <div className="flex items-center justify-center">
            <BoardDrawer />
          </div>

          <div className="flex items-center justify-center">
            <Link href={'/'} className="">
              <h1 className="text-xl font-bold">{PROJECT_NAME}</h1>
            </Link>
          </div>

          <div className="block md:hidden">
            {/* <ResponseDrawer /> */}
            <ThemeToggle />
          </div>
        </div>

        {/* display the current board the user is on */}
        <HeaderBoard />

        {/* toggle for light and dark mode */}
        <div className="hidden  md:block">
          <ThemeToggle />
        </div>
        {/* <div className="flex flex-row items-center justify-center space-x-2"> */}
        <ResponseDrawer />
        {/* </div> */}
      </div>
    </header>
  );
}
