import { updateColumn } from "../appwrite/columns";

/**

Deletes a card from a column by updating the column data.
@param {any} columnData - The data of the column to delete the card from.
@param {any} newColumnData - The updated column data without the card.
@returns {Promise} - A promise that resolves with the updated column data. */
export const deleteCardFromColumn = async (
  columnData: any,
  newColumnData: any
) => {
  const data = await updateColumn(columnData.$id, {
    todos: newColumnData.todos,
    order: newColumnData.order,
  });

  return data;
};
