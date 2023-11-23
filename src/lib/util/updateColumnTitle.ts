import { updateColumn } from "../appwrite/columns";

/**

Updates the title of a column with the provided title.
@param {string} columnId - The ID of the column to update.
@param {string} title - The updated title of the column.
@returns {Promise} - A promise that resolves with the updated column data. */
export const updateColumnTitle = async (columnId: string, title: string) => {
  const data = await updateColumn(columnId, { title: title });

  return data;
};
