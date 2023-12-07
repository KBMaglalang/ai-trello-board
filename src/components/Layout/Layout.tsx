import React from 'react';

// components
import { Header } from '../Header';
import { Modal } from '../Card';

export function Layout({ children }: any) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Header />
      {children}
      <Modal />
    </div>
  );
}
