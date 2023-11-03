"use client";

import { FormEvent, Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

// components
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import TaskPriorityGroup from "./TaskPriorityGroup";
import TaskDatePicker from "./TaskDatePicker";

import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";

function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);

  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  const [
    newTaskInput,
    setNewTaskInput,
    newTaskDescription,
    setNewTaskDescription,
    newTaskPriority,
    newTaskStartDate,
    newTaskEndDate,
    addTask,
    newTaskType,
    setImage,
    image,
  ] = useBoardStore((state) => [
    state.newTaskInput,
    state.setNewTaskInput,
    state.newTaskDescription,
    state.setNewTaskDescription,
    state.newTaskPriority,
    state.newTaskStartDate,
    state.newTaskEndDate,
    state.addTask,
    state.newTaskType,
    state.setImage,
    state.image,
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    addTask(
      newTaskInput,
      newTaskDescription,
      newTaskPriority,
      newTaskType,
      image,
      newTaskStartDate,
      newTaskEndDate
    );
    setImage(null);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        className="relative z-10"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="pb-2 text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  Add a Task
                </Dialog.Title>

                {/* task title input */}
                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a task here..."
                    className="w-full p-5 border border-gray-300 rounded-md outline-none"
                  />
                </div>

                {/* task description input */}
                <div className="mt-2">
                  <textarea
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="Enter a description here..."
                    className="w-full p-5 border border-gray-300 rounded-md outline-none"
                  />
                </div>

                {/* start and end date */}
                <TaskDatePicker />

                {/* radio group: null, low, medium, high */}
                <TaskPriorityGroup />

                {/* column type: todo, in progress, or done */}
                <TaskTypeRadioGroup />

                {/* File Input goes here... */}
                <div className="mt-2">
                  <button
                    onClick={() => {
                      imagePickerRef.current?.click();
                    }}
                    type="button"
                    className="w-full p-5 border border-gray-300 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <PhotoIcon className="inline-block w-6 h-6 mr-2" />
                    Upload Image
                  </button>
                  {image && (
                    <Image
                      alt="Uploaded Image"
                      width={200}
                      height={200}
                      className="object-cover w-full mt-2 transition-all duration-150 cursor-not-allowed h-44 filter hover:grayscale "
                      onClick={() => {
                        setImage(null);
                      }}
                      src={URL.createObjectURL(image)}
                    />
                  )}

                  <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={(e) => {
                      // check e is an image
                      if (!e.target.files![0].type.startsWith("image/")) return;
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
