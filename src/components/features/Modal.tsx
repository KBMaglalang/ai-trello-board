"use client";

import { FormEvent, Fragment, useRef, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

// components
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import TaskPriorityGroup from "./TaskPriorityGroup";
import TaskDatePicker from "./TaskDatePicker";

// store
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import { useNewBoardStore } from "@/store/NewBoardStore";

// constants and functions
import getUrl from "@/lib/getUrl";
import { createCard, updateCard, addCardToColumn } from "@/lib/appwrite/cards";

function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [
    getBoardList,
    workingBoard,
    setWorkingBoard,
    workingColumn,
    clearWorkingColumn,
  ] = useNewBoardStore((state) => [
    state.getBoardList,
    state.workingBoard,
    state.setWorkingBoard,

    state.workingColumn,
    state.clearWorkingColumn,
  ]);

  const [isOpen, isEditModal, cardInfo, closeModal, clearCardInfo] =
    useModalStore((state) => [
      // states
      state.isOpen,
      state.isEditModal,
      state.cardInfo,

      // getters
      state.closeModal,
      state.clearCardInfo,
    ]);

  const [
    newTaskInput,
    newTaskDescription,
    newTaskPriority,
    newTaskStartDate,
    newTaskEndDate,
    newTaskType,
    image,

    setNewTaskInput,
    setNewTaskDescription,
    addTask,
    setImage,
    updateTodoInDB,
    clearNewTaskStates,
  ] = useBoardStore((state) => [
    state.newTaskInput,
    state.newTaskDescription,
    state.newTaskPriority,
    state.newTaskStartDate,
    state.newTaskEndDate,
    state.newTaskType,
    state.image,

    state.setNewTaskInput,
    state.setNewTaskDescription,
    state.addTask,
    state.setImage,
    state.updateTodoInDB,
    state.clearNewTaskStates,
  ]);

  useEffect(() => {
    if (isEditModal) {
      setNewTaskInput(cardInfo?.todo?.title);
      setNewTaskDescription(cardInfo?.todo?.description);
      setImage(cardInfo?.todo?.image);
    }

    // if (image) {
    //   const fetchImage = async () => {
    //     const url = await getUrl(image!);
    //     if (url) {
    //       setImageUrl(url.toString());
    //     }
    //   };
    //   fetchImage();
    // }
  }, [
    isEditModal,
    cardInfo?.todo?.description,
    cardInfo?.todo?.image,
    cardInfo?.todo?.title,
    // image,
    setImage,
    setNewTaskDescription,
    setNewTaskInput,
  ]);

  const handleOnClose = () => {
    // ! old
    setImage(null);
    clearNewTaskStates();
    clearCardInfo();

    // ! new
    clearWorkingColumn();

    closeModal();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    if (isEditModal) {
      // update the todo fields in the db
      // updateTodoInDB(
      //   {
      //     ...cardInfo.todo!,
      //     title: newTaskInput,
      //     description: newTaskDescription,
      //     priority: newTaskPriority,
      //     status: newTaskType,
      //     image,
      //     startDate: newTaskStartDate,
      //     endDate: newTaskEndDate,
      //   },
      //   newTaskType
      // );
      updateCard(cardInfo.todo!.$id, {
        title: newTaskInput,
        description: newTaskDescription,
        priority: newTaskPriority,
        image,
        startDate: newTaskStartDate,
        endDate: newTaskEndDate,
      });
    } else {
      // take in the new card data and create a new card
      const newCardData = await createCard({
        title: newTaskInput,
        description: newTaskDescription,
        priority: newTaskPriority,
        // image,
        startDate: newTaskStartDate,
        endDate: newTaskEndDate,
      });

      // take the return data and update the working column
      const response = await addCardToColumn(workingColumn.$id, [
        ...workingColumn.todos,
        newCardData,
      ]);

      // TODO: update the board with the new information

      // addTask(
      //   newTaskInput,
      //   newTaskDescription,
      //   newTaskPriority,
      //   newTaskType,
      //   image,
      //   newTaskStartDate,
      //   newTaskEndDate
      // );
    }

    handleOnClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        className="relative z-10"
        onClose={handleOnClose}
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
                  {isEditModal ? "Edit Task" : "Add a Task"}
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
                {/* <TaskTypeRadioGroup /> */}

                {/* File Input goes here... */}
                {/* <div className="mt-2">
                  {image ? (
                    <Image
                      priority
                      alt="Uploaded Image"
                      width={200}
                      height={200}
                      className="object-cover w-full mt-2 transition-all duration-150 cursor-not-allowed h-44 filter hover:grayscale "
                      onClick={() => {
                        setImage(null);
                      }}
                      src={isEditModal ? imageUrl : URL?.createObjectURL(image)}
                    />
                  ) : (
                    <>
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

                      <input
                        type="file"
                        ref={imagePickerRef}
                        hidden
                        onChange={(e) => {
                          // check e is an image
                          if (!e.target.files![0].type.startsWith("image/"))
                            return;
                          setImage(e.target.files![0]);
                        }}
                      />
                    </>
                  )}
                </div> */}

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="w-full inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    {isEditModal ? "Update Task" : "Add Task"}
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
