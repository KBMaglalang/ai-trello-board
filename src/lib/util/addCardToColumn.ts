import { updateColumn } from '../appwrite/columns';

/**

Adds a card to a column by updating the column data.
@param {any} columnData - The data of the column to add the card to.
@param {any} cardData - The data of the card to add.
@returns {Promise} - A promise that resolves with the updated column data. */
export const addCardToColumn = async (columnData: any, cardData: any) => {
  const data = await updateColumn(columnData.$id, {
    todos: [...columnData.todos, cardData],
    order: [...columnData.order, cardData.$id],
  });

  return data;
};
