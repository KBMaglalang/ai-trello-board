import { updateBoard } from "../appwrite/boards";

/**

Adds a card to a column by updating the column data.
@param {any} columnData - The data of the column to add the card to.
@param {any} cardData - The data of the card to add.
@returns {Promise} - A promise that resolves with the updated column data. */

export const addColumnToBoard = async (boardData: any, newColumnData: any) => {
  const data = await updateBoard(boardData.$id, {
    columns: [...boardData.columns, newColumnData],
    order: [...boardData.order, newColumnData.$id],
  });

  return data;
};
