"use client";

import React, { useState, useEffect } from "react";
import { BuildingLibraryIcon } from "@heroicons/react/24/solid";

// components
import { Loading } from "../Common";

// store
import { useResponseDrawerStore } from "@/store/ResponseDrawerStore";

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

  useEffect(() => {
    if (!responseDrawerOpen && !responseLoading) {
      clearResponseSummary();
      clearResponseBreakdown();
    }
  }, [
    responseDrawerOpen,
    clearResponseSummary,
    clearResponseBreakdown,
    responseLoading,
  ]);

  return (
    <div className="drawer drawer-end z-1000">
      <input
        id="ai-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={responseDrawerOpen}
        onChange={toggleResponseDrawer}
      />
      <div className="drawer-content">
        {/* toggle button */}
        <label
          htmlFor="ai-drawer"
          className="btn btn-outline btn-sm drawer-button"
        >
          <BuildingLibraryIcon className="w-4 h-4" />
        </label>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="ai-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* sidebar */}

        <div className="flex flex-col menu p-4 w-80 min-h-full bg-base-200 text-base-content h-full overflow-hidden">
          {/* drawer title */}
          <div className="w-full text-center">
            <h1 className="text-xl font-bold  text-base-content pb-4">
              AI Response
            </h1>
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
              <p>{responseBreakdown}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
