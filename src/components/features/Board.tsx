"use client";

import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRouter } from "next/navigation";

// components
import Column from "./Column";
import { EmptyColumn } from "./Columns";

// store
import { BoardStateStore } from "@/store/BoardStateStore";

// constants and functions
import {
  findWorkingBoard,
  sortColumnOrder,
  updateBoardOrder,
  updateBoardColumns,
  sortCardOrder,
} from "@/lib/util";

export default function Board({ id }: { id: string }) {
  const router = useRouter();

  // new board test
  const [boardList, workingBoard, setWorkingBoard, workingColumn, workingCard] =
    BoardStateStore((state) => [
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

  const handleOnDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    // Check if user dragged card outside of board
    if (!destination) return;

    // Handle column drag
    if (type === "column") {
      const entries = workingBoard.columns;
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const updatedOrder = entries.map((column) => column.$id);

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
      const sourceColumn = columns.find((column) => {
        return column.$id === source.droppableId;
      });
      // remove card from source column
      const [removedCard] = sourceColumn?.todos.splice(source.index, 1);
      const [removeCardOrder] = sourceColumn?.order.splice(source.index, 1);
      // determine index of the source column
      const sourceColumnIndex = columns.findIndex((column) => {
        return column.$id === source.droppableId;
      });
      // replace the column in the columns array with the updated column
      columns[sourceColumnIndex] = sourceColumn;

      // find the column of the destination
      const destinationColumn = columns.find((column) => {
        return column.$id === destination.droppableId;
      });
      // add card to destination column
      destinationColumn?.todos.splice(destination.index, 0, removedCard);
      destinationColumn?.order.splice(destination.index, 0, removeCardOrder);
      // determine index of the destination column
      const destinationColumnIndex = columns.findIndex((column) => {
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

    // // This step is needed as the indexes are stored as numbers 0,1,2 etc. instead of id's with DND library
    // const columns = Array.from(board.columns);
    // const startColIndex = columns[Number(source.droppableId)];
    // const finishColIndex = columns[Number(destination.droppableId)];

    // const startCol: Column = {
    //   id: startColIndex[0],
    //   todos: startColIndex[1].todos,
    // };

    // const finishCol: Column = {
    //   id: finishColIndex[0],
    //   todos: finishColIndex[1].todos,
    // };

    // if (!startCol || !finishCol) return;

    // if (source.index === destination.index && startCol === finishCol) return;

    // const newTodos = startCol.todos;
    // const [todoMoved] = newTodos.splice(source.index, 1);

    // if (startCol.id === finishCol.id) {
    //   // same column task drag
    //   newTodos.splice(destination.index, 0, todoMoved);
    //   const newCol = {
    //     id: startCol.id,
    //     todos: newTodos,
    //   };
    //   const newColumns = new Map(board.columns);
    //   newColumns.set(startCol.id, newCol);

    //   setBoardState({ ...board, columns: newColumns });
    // } else {
    //   // different column task drag
    //   const finishTodos = Array.from(finishCol.todos);
    //   finishTodos.splice(destination.index, 0, todoMoved);
    //   const newColumns = new Map(board.columns);
    //   const newCol = {
    //     id: startCol.id,
    //     todos: newTodos,
    //   };

    //   newColumns.set(startCol.id, newCol);
    //   newColumns.set(finishCol.id, {
    //     id: finishCol.id,
    //     todos: finishTodos,
    //   });

    //   updateTodoInDB(todoMoved, finishCol.id);

    //   setBoardState({ ...board, columns: newColumns });
    // }
  };

  return (
    <div className="w-full h-full">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div
              // className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 max-w-7xl mx-auto"
              className="flex flex-row  space-x-2 w-full overflow-x-scroll h-full"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {/* list the columns from the board */}
              {workingBoard &&
                workingBoard?.columns?.map((column, index) => (
                  <Column key={column.$id} columnData={column} index={index} />
                ))}

              {provided.placeholder}

              {/* add in an empty column for the user to add a new column */}
              {workingBoard && (
                <EmptyColumn
                  // boardId={workingBoard?.$id}
                  // boardColumns={workingBoard?.columns || []}
                  boardData={workingBoard}
                />
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
