import { updateColumn } from "../appwrite/columns";

export const addCardToColumn = async (columnId: string, cardArray: any[]) => {
  const data = await updateColumn(columnId, { todos: cardArray });

  return data;
};
