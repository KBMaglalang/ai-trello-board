"use client";

import { FormEvent, Fragment, useRef, useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

// components
import TaskPriorityGroup from "./TaskPriorityGroup";
import TaskDatePicker from "./TaskDatePicker";

// store
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import { useNewBoardStore } from "@/store/NewBoardStore";

// constants and functions
import getUrl from "@/lib/getUrl";
import { createCard, updateCard, addCardToColumn } from "@/lib/appwrite/cards";
import { closeTaskModal } from "@/lib/util";

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

  const handleOnClose = async () => {
    closeModal();
    closeTaskModal();

    setImage(null);

    // ! old
    clearNewTaskStates();
    clearCardInfo();

    // ! new
    clearWorkingColumn();
    await getBoardList();
  };

  const handleSubmit = async (e: any) => {
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
      await updateCard(cardInfo.todo!.$id, {
        title: newTaskInput,
        description: newTaskDescription,
        priority: newTaskPriority,
        // image,
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
    }

    handleOnClose();
  };

  return (
    <dialog id="task_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">
          {isEditModal ? "Edit Task" : "Add a Task"}
        </h3>

        {/* task title input */}
        <div className="mt-2">
          <input
            type="text"
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            placeholder="Enter a task here..."
            className="input w-full p-5 border border-gray-300 rounded-md outline-none"
          />
        </div>

        {/* task description input */}
        <div className="mt-2">
          <textarea
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Enter a description here..."
            className="textarea textarea-bordered w-full p-5 border border-gray-300 rounded-md outline-none"
          />
        </div>

        {/* start and end date */}
        <TaskDatePicker />

        {/* select priority: null, low, medium, high */}
        <TaskPriorityGroup />

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

        <button
          onClick={handleSubmit}
          disabled={!newTaskInput}
          className="btn btn-primary w-full inline-flex mt-4"
        >
          {isEditModal ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* clicking outside of the modal */}
      <form method="dialog" className="modal-backdrop">
        <button></button>
      </form>
    </dialog>
  );
}

export default Modal;
