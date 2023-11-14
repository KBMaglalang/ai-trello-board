"use client";

import { useRef, useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

// components
import TaskPriorityGroup from "./TaskPriorityGroup";
import TaskDatePicker from "./TaskDatePicker";

// store
import { useModalStore } from "@/store/ModalStore";
import { useBoardStateStore } from "@/store/BoardStateStore";

// constants and functions
// import getUrl from "@/lib/getUrl";
import { getUrl } from "@/lib/ai";
import { createCard, updateCard } from "@/lib/appwrite/cards";
import { closeTaskModal } from "@/lib/util";
import { addCardToColumn } from "@/lib/util";

function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [
    workingBoard,
    workingColumn,
    clearWorkingColumn,

    cardTitle,
    cardDescription,
    cardStartDate,
    cardEndDate,
    cardPriority,
    cardImage,

    setCardTitle,
    setCardDescription,
    setCardImage,

    setWorkingBoard,
    setBoardList,
    boardList,
  ] = useBoardStateStore((state) => [
    state.workingBoard,

    state.workingColumn,
    state.clearWorkingColumn,

    state.cardTitle,
    state.cardDescription,
    state.cardStartDate,
    state.cardEndDate,
    state.cardPriority,
    state.cardImage,

    state.setCardTitle,
    state.setCardDescription,
    state.setCardImage,

    state.setWorkingBoard,
    state.setBoardList,
    state.boardList,
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

  useEffect(() => {
    if (isEditModal) {
      setCardTitle(cardInfo?.todo?.title);
      setCardDescription(cardInfo?.todo?.description);
      setCardImage(cardInfo?.todo?.image);
    }

    // if (cardImage) {
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
    setCardTitle,
    setCardDescription,
    setCardImage,
    // cardImage,
  ]);

  const handleOnClose = async () => {
    closeModal();
    closeTaskModal();

    setCardImage(null);
    clearCardInfo();
    clearWorkingColumn();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!cardTitle) return;

    let newCardData = null;
    let editWorkingColumn = null;

    if (isEditModal) {
      // update the todo fields in the db
      newCardData = await updateCard(cardInfo.todo!.$id, {
        title: cardTitle,
        description: cardDescription,
        priority: cardPriority,
        startDate: cardStartDate,
        endDate: cardEndDate,
        //  image: cardImage,
      });

      // find the working Column using cardInfo.id
      editWorkingColumn = workingBoard.columns.find(
        (column) => column.$id === cardInfo.id
      );
    } else {
      // take in the new card data and create a new card
      newCardData = await createCard({
        title: cardTitle,
        description: cardDescription,
        priority: cardPriority,
        startDate: cardStartDate,
        endDate: cardEndDate,
        //  image: cardImage,
      });
    }
    // take the return data and update the working column
    const response = await addCardToColumn(
      editWorkingColumn || workingColumn,
      newCardData
    );

    // update the column in the working board
    const newColumnList = workingBoard.columns.map((column) => {
      if (column.$id === response.$id) {
        return response;
      }

      return column;
    });

    const newWorkingBoard = { ...workingBoard, columns: newColumnList };

    const newBoardList = boardList.map((board) => {
      if (board.$id === newWorkingBoard.$id) {
        return newWorkingBoard;
      }

      return board;
    });

    setWorkingBoard(newWorkingBoard);
    setBoardList(newBoardList);

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
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            placeholder="Enter a task here..."
            className="input w-full p-5 border border-gray-300 rounded-md outline-none"
          />
        </div>

        {/* task description input */}
        <div className="mt-2">
          <textarea
            value={cardDescription}
            onChange={(e) => setCardDescription(e.target.value)}
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
          disabled={!cardTitle}
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
