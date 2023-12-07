'use client';

import React, { useState, useEffect } from 'react';
import { BuildingLibraryIcon } from '@heroicons/react/24/solid';

// components
import { Loading } from '../Common';

// store
import { useResponseDrawerStore } from '@/store/ResponseDrawerStore';

// constants and functions

export function ResponseDrawer() {
  const [
    responseDrawerOpen,
    toggleResponseDrawer,
    responseSummary,
    clearResponseSummary,
    responseBreakdown,
    clearResponseBreakdown,
    responseLoading,
  ] = useResponseDrawerStore((state) => [
    state.responseDrawerOpen,
    state.toggleResponseDrawer,
    state.responseSummary,
    state.clearResponseSummary,
    state.responseBreakdown,
    state.clearResponseBreakdown,
    state.responseLoading,
  ]);

  /**

  Executes a side effect to clear the response summary and breakdown data
  when the response drawer is closed and the response loading is completed.
  @returns {void} */
  useEffect(() => {
    if (!responseDrawerOpen && !responseLoading) {
      clearResponseSummary();
      clearResponseBreakdown();
    }
  }, [responseDrawerOpen, clearResponseSummary, clearResponseBreakdown, responseLoading]);

  return (
    <div className="z-1000 drawer drawer-end">
      <input
        id="ai-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={responseDrawerOpen}
        onChange={toggleResponseDrawer}
      />
      <div className="drawer-content">
        {/* toggle button */}
        <label htmlFor="ai-drawer" className="btn btn-outline drawer-button btn-sm hidden">
          <BuildingLibraryIcon className="h-4 w-4" />
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="ai-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        {/* sidebar */}

        <div className="menu flex h-full min-h-full w-80 flex-col overflow-hidden bg-base-200 p-4 text-base-content">
          {/* drawer title */}
          <div className="w-full text-center">
            <h1 className="pb-4 text-xl  font-bold text-base-content">AI Response</h1>
          </div>

          {/* loading */}
          {responseLoading && !responseSummary && !responseBreakdown && (
            <div className="flex-1">
              <Loading />
            </div>
          )}

          {/* board summary response */}
          {responseSummary && (
            <div>
              <p>{responseSummary}</p>
            </div>
          )}

          {/* task breakdown response */}
          {responseBreakdown && (
            <div>
              {responseBreakdown.map((line: string, index: number) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
