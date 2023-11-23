import { updateBoard } from "../appwrite/boards";

/**

Deletes a column from a board by updating the board data.
@param {any} boardData - The data of the board to delete the column from.
@param {any} columnData - The data of the column to delete.
@returns {Promise} - A promise that resolves with the updated board data. */
export const deleteColumnFromBoard = async (
  boardData: any,
  columnData: any
) => {
  const data = await updateBoard(boardData.$id, {
    columns: boardData.columns.filter(
      (column: any) => column.$id !== columnData.$id
    ),
    order: boardData.order.filter((id: string) => id !== columnData.$id),
  });

  return data;
};
