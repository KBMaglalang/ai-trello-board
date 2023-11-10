"use client";

import React, { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useRouter } from "next/navigation";

// components
import Column from "./Column";
import { EmptyColumn } from "./Columns";

// store
import { useNewBoardStore } from "@/store/NewBoardStore";

// constants and functions
import { findWorkingBoard } from "@/lib/util";

export default function Board({ id }: { id: string }) {
  const router = useRouter();

  // new board test
  const [boardList, workingBoard, setWorkingBoard] = useNewBoardStore(
    (state) => [state.boardList, state.workingBoard, state.setWorkingBoard]
  );

  useEffect(() => {
    if (id && boardList.length > 0) {
      const boardData = findWorkingBoard(boardList, id);

      // return to the homepage if no board is found
      if (!boardData) {
        router.replace("/");
        return;
      }

      // set the workingBoard
      setWorkingBoard(boardData);
    }
  }, [setWorkingBoard, router, boardList, id]);

  // TODO: to be updated to work with the new database structure
  // TODO: update for the latest DND library - default props to be deprecated
  const handleOnDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    // Check if user dragged card outside of board
    if (!destination) return;

    // Handle column drag
    if (type === "column") {
      const entries = workingBoard?.columns;
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);

      // update the current working board
      setWorkingBoard({ ...workingBoard, columns: entries });

      // const entries = Array.from(board.columns.entries());
      // const [removed] = entries.splice(source.index, 1);
      // entries.splice(destination.index, 0, removed);
      // const rearrangedColumns = new Map(entries);
      // setBoardState({ ...board, columns: rearrangedColumns });
      return;
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
                workingBoard?.columns.map((column, index) => (
                  <Column key={column.$id} columnData={column} index={index} />
                ))}

              {provided.placeholder}

              {/* add in an empty column for the user to add a new column */}
              {workingBoard && (
                <EmptyColumn
                  boardId={workingBoard?.$id}
                  boardColumns={workingBoard?.columns || []}
                />
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

/*



      board functions
      <div>
        <button className="btn btn-primary" onClick={() => getBoardList()}>
          clearBoard list
        </button>
        <button className="btn btn-primary" onClick={() => clearBoardList()}>
          clearBoard list
        </button>
        <button className="btn btn-primary" onClick={() => createNewBoard()}>
          create board
        </button>
        <button
          className="btn btn-primary"
          onClick={() =>
            updateNewBoard("65497b757f52036007c0", "updated title from the app")
          }
        >
          update board
        </button>
        <button
          className="btn btn-primary"
          onClick={() => deleteNewBoard("65497b757f52036007c0")}
        >
          delete board
        </button>
        <button
          className="btn btn-primary"
          onClick={() =>
            setWorkingBoard(
              "654835e8d50c53d6389b thought this is supposed to be the working board object instaed of the string"
            )
          }
        >
          set working board
        </button>
        <button className="btn btn-primary" onClick={() => clearWorkingBoard()}>
          clear working board
        </button>
      </div>

      column funtion
      <div>
        <button className="btn btn-error" onClick={() => createColumn()}>
          create
        </button>
        <button className="btn btn-error" onClick={() => getColumns()}>
          get
        </button>
        <button
          className="btn btn-error"
          onClick={() =>
            updateColumn("654848b1595dca307ac4", "new title updated")
          }
        >
          update
        </button>
        <button
          className="btn btn-error"
          onClick={() => deleteColumn("654848b1595dca307ac4")}
        >
          delete
        </button>
      </div>

      test code
      <div>
        <button
          className="btn btn-accent"
          onClick={() =>
            addColumnToBoard("65483a82edcd091acec6", [
              "65483a6ac0895791c764",
              "654851a7c2d2c3a99da9",
              "65483a5b5a932757456d",
            ])
          }
        >
          create
        </button>
      </div>
*/
