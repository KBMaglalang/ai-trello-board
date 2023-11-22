"use client";

import React, { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRouter } from "next/navigation";

// components
import { Column, EmptyColumn } from "../Columns";
import { Loading } from "../Common";

// store
import { useBoardStateStore } from "@/store/BoardStateStore";
import { useResponseDrawerStore } from "@/store/ResponseDrawerStore";

// constants and functions
import {
  findWorkingBoard,
  sortColumnOrder,
  updateBoardOrder,
  updateBoardColumns,
  sortCardOrder,
} from "@/lib/util";
import { getBoardSummary } from "@/lib/ai";

export function Board({ id }: { id: string }) {
  const router = useRouter();

  const [
    openResponseDrawer,
    setResponseSummary,
    setResponseLoading,
    clearResponseLoading,
  ] = useResponseDrawerStore((state) => [
    state.openResponseDrawer,
    state.setResponseSummary,
    state.setResponseLoading,
    state.clearResponseLoading,
  ]);

  // new board test
  const [boardList, workingBoard, setWorkingBoard, workingColumn, workingCard] =
    useBoardStateStore((state) => [
      state.boardList,
      state.workingBoard,
      state.setWorkingBoard,
      state.workingColumn,
      state.workingCard,
    ]);

  // when the board is selected populate the working board if it is available or return to the homepage if not found
  useEffect(() => {
    if (id && boardList.length > 0 && !workingBoard) {
      const boardData = findWorkingBoard(boardList, id);

      // return to the homepage if no board is found
      if (!boardData) {
        router.replace("/");
        return;
      }

      const sortedColumns = sortColumnOrder(boardData);
      const sortedCardsColumns = sortCardOrder(sortedColumns);
      const newBoardData = { ...boardData, columns: sortedCardsColumns };

      // set the workingBoard
      setWorkingBoard(newBoardData);
    }
  }, [setWorkingBoard, router, boardList, id, workingBoard]);

  const handleSummarize = async () => {
    setResponseLoading(true);
    const response = await getBoardSummary(workingBoard);
    clearResponseLoading();
    setResponseSummary(response);
    openResponseDrawer();
  };

  const handleOnDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    // Check if user dragged card outside of board
    if (!destination) return;

    // Handle column drag
    if (type === "column") {
      const entries = workingBoard.columns;
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const updatedOrder = entries.map((column: any) => column.$id);

      // update the current working board
      setWorkingBoard({
        ...workingBoard,
        columns: entries,
        order: updatedOrder,
      });

      // update the order of the columns in the database for the board
      await updateBoardOrder(workingBoard.$id, updatedOrder);

      return;
    }

    if (type === "card") {
      // find the card and column that is being edited on
      const columns = workingBoard.columns;

      // find the column of the source
      const sourceColumn = columns.find((column: any) => {
        return column.$id === source.droppableId;
      });
      // remove card from source column
      const [removedCard] = sourceColumn?.todos.splice(source.index, 1);
      const [removeCardOrder] = sourceColumn?.order.splice(source.index, 1);
      // determine index of the source column
      const sourceColumnIndex = columns.findIndex((column: any) => {
        return column.$id === source.droppableId;
      });
      // replace the column in the columns array with the updated column
      columns[sourceColumnIndex] = sourceColumn;

      // find the column of the destination
      const destinationColumn = columns.find((column: any) => {
        return column.$id === destination.droppableId;
      });
      // add card to destination column
      destinationColumn?.todos.splice(destination.index, 0, removedCard);
      destinationColumn?.order.splice(destination.index, 0, removeCardOrder);
      // determine index of the destination column
      const destinationColumnIndex = columns.findIndex((column: any) => {
        return column.$id === destination.droppableId;
      });
      // replace the column in the columns array with the updated column
      columns[destinationColumnIndex] = destinationColumn;

      // update the workingBoard
      setWorkingBoard({
        ...workingBoard,
        columns,
      });

      // update the database
      updateBoardColumns(workingBoard.$id, columns);
    }
  };

  if (!workingBoard) return <Loading />;

  return (
    <div className="w-full h-full p-5">
      <div className="w-full flex items-end justify-end">
        <button className="btn btn-accent ml:auto" onClick={handleSummarize}>
          AI Summary
        </button>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div
              className="flex flex-row  space-x-2 w-full overflow-x-scroll h-full"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {/* list the columns from the board */}
              {workingBoard &&
                workingBoard?.columns?.map((column: any, index: number) => (
                  <Column key={column.$id} columnData={column} index={index} />
                ))}

              {provided.placeholder}

              {/* add in an empty column for the user to add a new column */}
              {workingBoard && <EmptyColumn boardData={workingBoard} />}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
