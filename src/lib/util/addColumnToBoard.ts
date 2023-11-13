import { updateBoard } from "../appwrite/boards";

export const addColumnToBoard = async (boardData: any, newColumnData: any) => {
  const data = await updateBoard(boardData.$id, {
    columns: [...boardData.columns, newColumnData],
    order: [...boardData.order, newColumnData.$id],
  });

  return data;
};
